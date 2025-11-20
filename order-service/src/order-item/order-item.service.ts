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
    @InjectRepository(OrderItem) private readonly orderItemRepo: Repository<OrderItem>,
    @InjectRepository(Order) private readonly orderRepo: Repository<Order>,
    private readonly httpService: HttpService,
  ) {}

  private async fetchMenuItem(id: number): Promise<any | null> {
    const paths = ['/menu-items/:id', '/menu/:id', '/:id', '/menu-service/:id'];
    for (const p of paths) {
      try {
        const resp = await this.httpService.axiosRef.get(`${this.MENU_BASE}${p.replace(':id', String(id))}`);
        if (resp && resp.status >= 200 && resp.status < 300 && resp.data) return resp.data;
      } catch {}
    }
    return null;
  }

  async create(dto: { orderId: number; menuItemId: number; quantity: number; price?: number }) {
    const order = await this.orderRepo.findOne({ where: { id: dto.orderId } });
    if (!order) throw new NotFoundException('Order not found');

    const menuItem = await this.fetchMenuItem(dto.menuItemId);
    if (!menuItem) throw new NotFoundException('MenuItem not found');

    const price = dto.price ?? Number(menuItem.price ?? 0);
    const item = this.orderItemRepo.create({
      order,
      menuItemId: dto.menuItemId,
      quantity: dto.quantity,
      price,
    });
    return this.orderItemRepo.save(item);
  }

  async findAll(): Promise<OrderItem[]> {
    return this.orderItemRepo.find();
  }

  async findOne(id: number): Promise<OrderItem> {
    const item = await this.orderItemRepo.findOne({ where: { id } });
    if (!item) throw new NotFoundException('OrderItem not found');
    return item;
  }

  async update(id: number, dto: Partial<OrderItem>): Promise<OrderItem> {
    await this.orderItemRepo.update(id, dto);
    const updated = await this.findOne(id);
    if (!updated) throw new NotFoundException('OrderItem not found');
    return updated;
  }

  async remove(id: number): Promise<void> {
    await this.orderItemRepo.delete(id);
  }
}