import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { OrderItem } from './entities/order-item.entity';
import { Order } from '../order/entities/order.entity';
import { HttpService } from '@nestjs/axios';

@Injectable()
export class OrderItemService {
  private MENU_BASE = 'http://localhost:3002/menu-service';

  constructor(
    @InjectRepository(OrderItem)
    private readonly orderItemRepo: Repository<OrderItem>,

    @InjectRepository(Order)
    private readonly orderRepo: Repository<Order>,

    private readonly httpService: HttpService,
  ) {}

  private async fetchMenuItem(id: number): Promise<any | null> {
    const paths = ['/menu-items/:id', '/menu/:id', '/:id', '/menu-service/:id'];

    for (const p of paths) {
      try {
        const resp = await this.httpService.axiosRef.get(
          `${this.MENU_BASE}${p.replace(':id', String(id))}`,
        );

        if (resp?.status >= 200 && resp.status < 300 && resp.data) {
          return resp.data;
        }
      } catch {
        // se ignora y se prueba el siguiente path
      }
    }

    return null;
  }

  // 🔥 MÉTODO CORREGIDO
  async create(dto: {
    orderId: number;
    menuItemId: number;
    quantity: number;
    price?: number;
  }) {
    // 1️⃣ Validar orden
    const order = await this.orderRepo.findOne({
      where: { id: dto.orderId },
    });

    if (!order) {
      throw new NotFoundException('Order not found');
    }

    // 2️⃣ Validar producto
    const menuItem = await this.fetchMenuItem(dto.menuItemId);
    if (!menuItem) {
      throw new NotFoundException('MenuItem not found');
    }

    // 3️⃣ Crear item
    const price = dto.price ?? Number(menuItem.price ?? 0);

    const item = this.orderItemRepo.create({
      order,
      menuItemId: dto.menuItemId,
      quantity: dto.quantity,
      price,
    });

    // 4️⃣ Guardar item
    const savedItem = await this.orderItemRepo.save(item);

    // 5️⃣ 🔥 RECARGAR ORDEN CON ITEMS (CLAVE)
    const updatedOrder = await this.orderRepo.findOne({
      where: { id: order.id },
      relations: ['items'],
    });

    // 6️⃣ Devolver respuesta coherente
    return {
      ...savedItem,
      order: updatedOrder,
    };
  }

  async findAll(): Promise<OrderItem[]> {
    return this.orderItemRepo.find({
      relations: ['order'],
    });
  }

  async findOne(id: number): Promise<OrderItem> {
    const item = await this.orderItemRepo.findOne({
      where: { id },
      relations: ['order'],
    });

    if (!item) {
      throw new NotFoundException('OrderItem not found');
    }

    return item;
  }

  async update(id: number, dto: Partial<OrderItem>): Promise<OrderItem> {
    await this.orderItemRepo.update(id, dto);
    return this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    await this.orderItemRepo.delete(id);
  }
}
