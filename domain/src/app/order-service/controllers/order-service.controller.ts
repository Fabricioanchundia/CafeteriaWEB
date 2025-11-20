import { Controller, Get, Post, Body, Patch, Param, Delete, Put } from '@nestjs/common';
import { OrderServiceService } from '../services/order-service.service';
import { CreateOrderDto } from '../dto/create-order.dto';
import { UpdateOrderDto } from '../dto/update-order.dto';
import { Order } from '../entities/order.entity';

@Controller('order-service')
export class OrderServiceController {
  constructor(private readonly orderServiceService: OrderServiceService) {}

  @Post()
  create(@Body() dto: CreateOrderDto): Promise<Order> {
    return this.orderServiceService.create(dto);
  }

  @Get()
  findAll(): Promise<Order[]> {
    return this.orderServiceService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<Order> {
    return this.orderServiceService.findOne(+id);
  }

  @Put(':id')
  replace(@Param('id') id: string, @Body() dto: UpdateOrderDto): Promise<Order> {
    return this.orderServiceService.update(+id, dto);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() dto: UpdateOrderDto): Promise<Order> {
    return this.orderServiceService.update(+id, dto);
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<void> {
    return this.orderServiceService.remove(+id);
  }
}
