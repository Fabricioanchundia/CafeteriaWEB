import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrderItemService } from './order-item.service';
import { OrderServiceController } from './order-item.controller';
import { Order } from '../order/entities/order.entity';
import { OrderItem } from '../order-item/entities/order-item.entity';
import { HttpModule } from '@nestjs/axios';
import { MenuItem } from '../../../menu-service/src/menu-item/entities/menu-item.entity';

@Module({
  imports: [TypeOrmModule.forFeature([OrderItem, Order, MenuItem]), HttpModule],
  controllers: [OrderServiceController],
  providers: [OrderItemService],
})
export class OrderItemModule {}
