import { Injectable, NotFoundException, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import axios from 'axios';

import { Order } from './entities/order.entity';
import { OrderItem } from '../order-item/entities/order-item.entity';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';

@Injectable()
export class OrderService {
  private readonly logger = new Logger(OrderService.name);

  constructor(
    @InjectRepository(Order)
    private readonly orderRepo: Repository<Order>,

    @InjectRepository(OrderItem)
    private readonly orderItemRepo: Repository<OrderItem>,
  ) {}

  // ===============================================================
  // 🟢 CREATE ORDER (ORDEN + ITEMS BIEN RELACIONADOS)
  // ===============================================================
  async create(dto: CreateOrderDto): Promise<Order> {
    // 1️⃣ Validar cliente
    const customerResp = await axios.get(
      `http://localhost:3001/customer-service/${dto.customerId}`,
      { validateStatus: () => true },
    );

    if (customerResp.status !== 200) {
      throw new NotFoundException(`Customer ${dto.customerId} not found`);
    }

    // 2️⃣ Crear orden VACÍA
    const order = this.orderRepo.create({
      customerId: dto.customerId,
      status: dto.status ?? 'pending',
      total: 0,
      createdAt: new Date(),
    });

    const savedOrder = await this.orderRepo.save(order);

    // 3️⃣ Crear items RELACIONADOS
    const savedItems: OrderItem[] = [];

    for (const i of dto.items) {
      const menuResp = await axios.get(
        `http://localhost:3002/menu-service/${i.menuItemId}`,
        { validateStatus: () => true },
      );

      if (menuResp.status !== 200) {
        throw new NotFoundException(`MenuItem ${i.menuItemId} not found`);
      }

      const price = Number(i.price ?? menuResp.data.price);
      const quantity = i.quantity ?? 1;

      const item = this.orderItemRepo.create({
        order: savedOrder, // 🔥 RELACIÓN EXPLÍCITA
        menuItemId: i.menuItemId,
        quantity,
        price,
      });

      savedItems.push(await this.orderItemRepo.save(item));
    }

    // 4️⃣ Recalcular total
    savedOrder.total = savedItems.reduce(
      (acc, item) => acc + Number(item.price) * item.quantity,
      0,
    );

    await this.orderRepo.save(savedOrder);

    // 5️⃣ Enviar a Analytics (opcional)
    try {
      await axios.post(
        'http://localhost:3005/analytics/new-order',
        {
          id: savedOrder.id,
          customerId: savedOrder.customerId,
          total: savedOrder.total,
          createdAt: savedOrder.createdAt,
          items: savedItems.map(i => ({
            menuItemId: i.menuItemId,
            quantity: i.quantity,
            price: i.price,
          })),
        },
        { validateStatus: () => true },
      );
    } catch {
      this.logger.warn('Analytics not available');
    }

    // 6️⃣ DEVOLVER ORDEN COMPLETA (SIN ERROR TS)
    const fullOrder = await this.orderRepo.findOne({
      where: { id: savedOrder.id },
      relations: ['items'],
    });

    if (!fullOrder) {
      throw new NotFoundException('Order not found after creation');
    }

    return fullOrder;
  }

  // ===============================================================
  // 🔵 GET ALL
  // ===============================================================
  async findAll(): Promise<any[]> {
    const orders = await this.orderRepo.find({
      relations: ['items'],
      order: { createdAt: 'ASC' },
    });

    for (const order of orders) {
      for (const item of order.items) {
        try {
          const resp = await axios.get(
            `http://localhost:3002/menu-service/${item.menuItemId}`,
            { timeout: 3000 },
          );
          (item as any).productName = resp.data.name;
        } catch {
          (item as any).productName = `Producto #${item.menuItemId}`;
        }
      }
    }

    return orders;
  }

  // ===============================================================
  // 🔵 GET ONE
  // ===============================================================
  async findOne(id: number): Promise<any> {
    const order = await this.orderRepo.findOne({
      where: { id },
      relations: ['items'],
    });

    if (!order) {
      throw new NotFoundException('Order not found');
    }

    for (const item of order.items) {
      try {
        const resp = await axios.get(
          `http://localhost:3002/menu-service/${item.menuItemId}`,
          { timeout: 3000 },
        );
        (item as any).productName = resp.data.name;
      } catch {
        (item as any).productName = `Producto #${item.menuItemId}`;
      }
    }

    return order;
  }

  // ===============================================================
  // 🟠 UPDATE
  // ===============================================================
  async update(id: number, dto: UpdateOrderDto): Promise<Order> {
    const order = await this.findOne(id);

    if (dto.status) order.status = dto.status;
    if (dto.customerId) order.customerId = dto.customerId;

    return this.orderRepo.save(order);
  }

  // ===============================================================
  // 🔴 DELETE
  // ===============================================================
  async remove(id: number): Promise<void> {
    await this.orderRepo.delete(id);
  }
}
