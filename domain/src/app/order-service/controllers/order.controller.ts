import { Controller, Post, Body, Get, Param, Patch, Delete,Put } from '@nestjs/common';
import { OrderService } from '../services/order.service';
import { CreateOrderDto } from '../dto/create-order.dto';
import { UpdateOrderDto } from '../dto/update-order.dto';

@Controller('orders')
export class OrderController {
  constructor(private readonly service: OrderService) {}

  @Post()
  create(@Body() dto: CreateOrderDto) {
    return this.service.create(dto);
  }

  @Get()
  findAll(): any {
    return this.service.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): any {
    return this.service.findOne(+id);
  }

  @Put(':id')
  replace(@Param('id') id: string, @Body() dto: UpdateOrderDto): any {
    return this.service.update(+id, dto);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() dto: UpdateOrderDto): any {
    return this.service.update(+id, dto);
  }

  @Delete(':id')
  remove(@Param('id') id: string): any {
    return this.service.remove(+id);
  }
}
