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
export class OrderService {
  constructor(
    @InjectRepository(Order)
    private readonly orderRepository: Repository<Order>,

    @InjectRepository(OrderItem)
    private readonly orderItemRepository: Repository<OrderItem>,

    @InjectRepository(Customer)
    private readonly customerRepository: Repository<Customer>,

    @InjectRepository(MenuItem)
    private readonly menuItemRepository: Repository<MenuItem>,
  ) {}

  async create(dto: CreateOrderDto) {
    // validar customer
    const customer = await this.customerRepository.findOne({ where: { id: dto.customerId } });
    if (!customer) {
      throw new NotFoundException(`Customer con id ${dto.customerId} no encontrado`);
    }

    const items: OrderItem[] = [];
    let total = 0;

    for (const it of dto.items) {
      const menuItem = await this.menuItemRepository.findOne({ where: { id: it.menuItemId } });
      if (!menuItem) {
        throw new NotFoundException(`MenuItem con id ${it.menuItemId} no encontrado`);
      }

      const price = menuItem.price; // precio oficial
      const quantity = it.quantity;
      total += price * quantity;

      const orderItem = this.orderItemRepository.create({
        menuItem,
        quantity,
        price,
      });
      items.push(orderItem);
    }

    const newOrder = this.orderRepository.create({
      customer,   // ✅ asignamos el objeto completo
      items,
      total,
      status: 'pending',
    });

    return this.orderRepository.save(newOrder);
  }

  findAll() {
    return this.orderRepository.find({
      relations: ['customer', 'items', 'items.menuItem'],
    });
  }

  async findOne(id: number) {
    const order = await this.orderRepository.findOne({
      where: { id },
      relations: ['customer', 'items', 'items.menuItem'],
    });
    if (!order) {
      throw new NotFoundException(`Order con id ${id} no encontrada`);
    }
    return order;
  }

  async update(id: number, dto: UpdateOrderDto) {
    const order = await this.findOne(id);

    if (dto.customerId) {
      const customer = await this.customerRepository.findOne({ where: { id: dto.customerId } });
      if (!customer) {
        throw new NotFoundException(`Customer con id ${dto.customerId} no encontrado`);
      }
      order.customer = customer;   // ✅ corregido
    }

    if (dto.items) {
      const newItems: OrderItem[] = [];
      let total = 0;

      for (const it of dto.items) {
        const menuItem = await this.menuItemRepository.findOne({ where: { id: it.menuItemId } });
        if (!menuItem) {
          throw new NotFoundException(`MenuItem con id ${it.menuItemId} no encontrado`);
        }

        const price = menuItem.price;
        const quantity = it.quantity?? 1;
        total += price * quantity;

        const orderItem = this.orderItemRepository.create({
          menuItem,
          quantity,
          price,
          order, // mantener relación
        });
        newItems.push(orderItem);
      }

      order.items = newItems;
      order.total = total;
    }

    // actualizamos los demás campos (ej. status)
    Object.assign(order, dto);
    return this.orderRepository.save(order);
  }

  async remove(id: number) {
    const order = await this.findOne(id);
    return this.orderRepository.remove(order);
  }
}
