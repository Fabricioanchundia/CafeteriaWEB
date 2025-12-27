import { Controller, Get, Post, Body, Patch, Param, Delete, Put } from '@nestjs/common';
import { OrderItemService } from './order-item.service';
import { CreateOrderItemDto } from './dto/create-order-item.dto';
import { UpdateOrderItemDto } from './dto/update-order-item.dto';
import { OrderItem } from './entities/order-item.entity';

@Controller('order-service')
export class OrderServiceController {
  constructor(private readonly orderItemService: OrderItemService) {}

  @Post()
  create(@Body() dto: CreateOrderItemDto): ReturnType<OrderItemService['create']> {
    return this.orderItemService.create(dto);
  }

  @Get()
  findAll(): ReturnType<OrderItemService['findAll']> {
    return this.orderItemService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): ReturnType<OrderItemService['findOne']> {
    return this.orderItemService.findOne(+id);
  }

  @Put(':id')
  replace(
    @Param('id') id: string,
    @Body() dto: UpdateOrderItemDto,
  ): ReturnType<OrderItemService['update']> {
    return this.orderItemService.update(+id, dto);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() dto: UpdateOrderItemDto): ReturnType<OrderItemService['update']> {
    return this.orderItemService.update(+id, dto);
  }

  @Delete(':id')
  remove(@Param('id') id: string): ReturnType<OrderItemService['remove']> {
    return this.orderItemService.remove(+id);
  }
}
