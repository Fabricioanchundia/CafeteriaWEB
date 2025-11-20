import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Order } from '../entities/order.entity';
import { OrderItem } from '../entities/order-item.entity';
import { Customer } from '../../customer-service/entities/customer.entity';
import { MenuItem } from '../../menu-service/entities/menu-item.entity';
import { OrderService } from '../services/order.service';
import { OrderController } from '../controllers/order.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([Order, OrderItem, Customer, MenuItem]),
  ],
  controllers: [OrderController],
  providers: [OrderService],
  exports: [OrderService], // por si lo usas en otros módulos
})
export class OrderModule {}
