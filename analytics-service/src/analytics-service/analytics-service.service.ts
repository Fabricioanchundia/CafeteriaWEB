import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Order } from './entities/order.entity';
import { OrderItem } from './entities/order-item.entity';

@Injectable()
export class AnalyticsService {
  constructor(
    @InjectRepository(Order)
    private readonly orderRepo: Repository<Order>,

    @InjectRepository(OrderItem)
    private readonly itemRepo: Repository<OrderItem>,
  ) {}

  // 📌 1. Resumen general
  async getSummary() {
    const totalOrders = await this.orderRepo.count();

    const { sum } = await this.orderRepo
      .createQueryBuilder('o')
      .select('COALESCE(SUM(o.total), 0)', 'sum')
      .getRawOne();

    return {
      totalOrders,
      totalRevenue: Number(sum),
    };
  }

  // 📌 2. Ventas por día
  async getDailySales() {
    const rows = await this.orderRepo
      .createQueryBuilder('o')
      .select('DATE(o.createdAt)', 'date')
      .addSelect('COALESCE(SUM(o.total), 0)', 'total')
      .groupBy('DATE(o.createdAt)')
      .orderBy('DATE(o.createdAt)', 'ASC')
      .getRawMany();

    return rows.map(r => ({
      date: r.date,
      total: Number(r.total),
    }));
  }

  // 📌 3. Items más vendidos (FIX DEFINITIVO)
  async getTopItems(limit = 5) {
    const rows = await this.itemRepo
      .createQueryBuilder('i')
      .select('i.menuItemId', 'menuItemId')
      .addSelect('i.product_name', 'productName') // DB: snake_case
      .addSelect('SUM(i.quantity)', 'qty')
      .addSelect(
        'SUM(CAST(i.price AS NUMERIC) * i.quantity)',
        'revenue',
      )
      .groupBy('i.menuItemId')
      .addGroupBy('i.product_name')
      .orderBy('qty', 'DESC')
      .limit(limit)
      .getRawMany();

    return rows.map(r => ({
      menuItemId: Number(r.menuItemId),
      productName: r.productName,
      quantitySold: Number(r.qty),
      revenue: Number(r.revenue),
    }));
  }

  // 📌 4. Registrar órdenes desde ORDER-SERVICE
  async registerOrder(order: any) {
    // ➤ Insertar la orden
    const newOrder = this.orderRepo.create({
      id: order.id,
      customerId: order.customerId,
      total: order.total,
      createdAt: new Date(order.createdAt ?? new Date()),
    });

    await this.orderRepo.save(newOrder);

    // ➤ Insertar items
    if (Array.isArray(order.items)) {
      for (const it of order.items) {
        const item = this.itemRepo.create({
          menuItemId: it.menuItemId,
          productName: it.productName, // 👈 IMPORTANTE
          quantity: it.quantity,
          price: it.price,
          order: newOrder,
        });

        await this.itemRepo.save(item);
      }
    }

    return {
      message: 'Order recorded in analytics',
      orderId: order.id,
    };
  }
}
