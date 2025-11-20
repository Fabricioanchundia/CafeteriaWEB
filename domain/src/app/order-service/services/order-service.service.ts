import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Order } from '../entities/order.entity';
import { OrderItem } from '../entities/order-item.entity';
import { Customer } from '../../customer-service/entities/customer.entity';
import { MenuItem } from '../../menu-service/entities/menu-item.entity';
import { CreateOrderDto } from '../dto/create-order.dto';
import { UpdateOrderDto } from '../dto/update-order.dto';

@Injectable()
export class OrderServiceService {
  constructor(
    @InjectRepository(Order) private readonly orderRepo: Repository<Order>,
    @InjectRepository(OrderItem) private readonly orderItemRepo: Repository<OrderItem>,
    @InjectRepository(Customer) private readonly customerRepo: Repository<Customer>,
    @InjectRepository(MenuItem) private readonly menuItemRepo: Repository<MenuItem>,
  ) {}

  async create(dto: CreateOrderDto): Promise<Order> {
    const customer = await this.customerRepo.findOneBy({ id: dto.customerId });
    if (!customer) throw new NotFoundException('Customer not found');

    // construir items y calcular total (tomando precio del dto o del menú)
    const items: OrderItem[] = [];
    let total = 0;

    for (const i of dto.items) {
      const menuItem = await this.menuItemRepo.findOneBy({ id: i.menuItemId });
      if (!menuItem) throw new NotFoundException(`MenuItem ${i.menuItemId} not found`);

      const price = i.price ?? Number(menuItem.price); // usa precio del menú si no viene en el dto
      const item = this.orderItemRepo.create({
        menuItem,
        quantity: i.quantity,
        price,
      });
      items.push(item);
      total += price * i.quantity;
    }

    const order = this.orderRepo.create({
      customer,
      status: dto.status ?? 'pending',
      items,
      total,
    });

    return this.orderRepo.save(order);
  }

  findAll(): Promise<Order[]> {
    return this.orderRepo.find();
  }

  async findOne(id: number): Promise<Order> {
    const order = await this.orderRepo.findOne({ where: { id } });
    if (!order) throw new NotFoundException('Order not found');
    return order;
  }

  async update(id: number, dto: UpdateOrderDto): Promise<Order> {
    const order = await this.findOne(id);

    if (dto.customerId !== undefined) {
      const customer = await this.customerRepo.findOneBy({ id: dto.customerId });
      if (!customer) throw new NotFoundException('Customer not found');
      order.customer = customer;
    }

    if (dto.status !== undefined) order.status = dto.status;

    if (dto.items) {
      const items: OrderItem[] = [];
      let total = 0;

      for (const i of dto.items) {
        const menuItem = await this.menuItemRepo.findOneBy({ id: i.menuItemId! });
        if (!menuItem) throw new NotFoundException(`MenuItem ${i.menuItemId} not found`);

        const price = i.price ?? Number(menuItem.price);
        const item = this.orderItemRepo.create({
          menuItem,
          quantity: i.quantity ?? 1,
          price,
          order,
        });
        items.push(item);
        total += price * (i.quantity ?? 1);
      }

      order.items = items;
      order.total = total;
    }

    return this.orderRepo.save(order);
  }

  async remove(id: number): Promise<void> {
    await this.orderRepo.delete(id);
  }
}
