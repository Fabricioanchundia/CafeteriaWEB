import { Injectable, NotFoundException, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Order } from './entities/order.entity';
import { OrderItem } from '../order-item/entities/order-item.entity';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import axios from 'axios';

@Injectable()
export class OrderService {
  private readonly logger = new Logger(OrderService.name);

  constructor(
    @InjectRepository(Order) private readonly orderRepo: Repository<Order>,
    @InjectRepository(OrderItem) private readonly orderItemRepo: Repository<OrderItem>,
  ) {}

  // ===============================================================
  // 🟢 CREATE ORDER
  // ===============================================================
  async create(dto: CreateOrderDto): Promise<Order> {
    this.logger.log('Entrando al método create con DTO: ' + JSON.stringify(dto));

    // 1️⃣ Validar cliente
    const customerUrl = `http://127.0.0.1:3001/customer-service/${dto.customerId}`;
    const customerResp = await axios.get(customerUrl, {
      timeout: 5000,
      validateStatus: () => true,
    });

    if (customerResp.status !== 200) {
      throw new NotFoundException(`Customer ${dto.customerId} not found`);
    }

    // 2️⃣ Construir los items
    const items: OrderItem[] = [];
    let total = 0;

    for (const i of dto.items) {
      const menuUrl = `http://127.0.0.1:3002/menu-service/${i.menuItemId}`;
      const menuResp = await axios.get(menuUrl, {
        timeout: 5000,
        validateStatus: () => true,
      });

      if (menuResp.status !== 200) {
        throw new NotFoundException(`MenuItem ${i.menuItemId} not found`);
      }

      const price = i.price ?? Number(menuResp.data.price);

      const item = this.orderItemRepo.create({
        menuItemId: i.menuItemId,
        quantity: i.quantity ?? 1,
        price,
      });

      items.push(item);
      total += price * (i.quantity ?? 1);
    }

    // 3️⃣ Crear la orden
    const order = this.orderRepo.create({
      customerId: dto.customerId,
      status: dto.status ?? 'pending',
      items,
      total,
    });

    const savedOrder = await this.orderRepo.save(order);

    // 4️⃣ Enviar al WebSocket
    try {
      await axios.post('http://localhost:3006/events/new-order', savedOrder);
    } catch (err) {
      this.logger.error('Error enviando evento al WebSocket');
    }

    // 5️⃣ Enviar al microservicio Analytics
    try {
      await axios.post('http://localhost:3005/analytics/new-order', {
        id: savedOrder.id,
        customerId: savedOrder.customerId,
        total: savedOrder.total,
        createdAt: savedOrder.createdAt,
        items: savedOrder.items.map(i => ({
          menuItemId: i.menuItemId,
          quantity: i.quantity,
          price: i.price,
        })),
      });

      this.logger.log('Orden enviada a Analytics correctamente');
    } catch (err) {
      this.logger.error('Error enviando orden a Analytics: ' + err.message);
    }

    return savedOrder;
  }

  // ===============================================================
  // 🔵 GET ALL
  // ===============================================================
  findAll(): Promise<Order[]> {
    return this.orderRepo.find({ relations: ['items'] });
  }

  // ===============================================================
  // 🔵 GET ONE
  // ===============================================================
  async findOne(id: number): Promise<Order> {
    const order = await this.orderRepo.findOne({
      where: { id },
      relations: ['items'],
    });
    if (!order) throw new NotFoundException('Order not found');
    return order;
  }

  // ===============================================================
  // 🟠 UPDATE ORDER
  // ===============================================================
  async update(id: number, dto: UpdateOrderDto): Promise<Order> {
    const order = await this.findOne(id);

    if (dto.customerId !== undefined) {
      const customerUrl = `http://127.0.0.1:3001/customer-service/${dto.customerId}`;
      const customerResp = await axios.get(customerUrl, {
        timeout: 5000,
        validateStatus: () => true,
      });

      if (customerResp.status !== 200) {
        throw new NotFoundException(`Customer ${dto.customerId} not found`);
      }

      order.customerId = dto.customerId;
    }

    if (dto.status !== undefined) {
      order.status = dto.status;
    }

    const updatedOrder = await this.orderRepo.save(order);

    // 🔥 Notificar WebSocket
    try {
      await axios.post('http://localhost:3006/events/order-status', updatedOrder);
    } catch (err) {
      this.logger.error('Error enviando evento al WebSocket');
    }

    return updatedOrder;
  }

  // ===============================================================
  // 🔴 DELETE ORDER
  // ===============================================================
  async remove(id: number): Promise<void> {
    await this.orderRepo.delete(id);
  }
}
