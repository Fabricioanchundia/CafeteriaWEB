import { Controller, Get, Post, Body, Patch, Param, Delete, Put, NotFoundException } from '@nestjs/common';
import { CustomerService } from '../customer/customer.service';
import { CreateCustomerDto } from '../customer/dto/create-customer.dto';
import { UpdateCustomerDto } from '../customer/dto/update-customer.dto';

@Controller('customer-service')
export class CustomerController {
  constructor(
    private readonly customerService: CustomerService,
  ) {}

  @Post()
  async create(@Body() createCustomerDto: CreateCustomerDto) {
    return await this.customerService.create(createCustomerDto);
  }

  @Get()
  async findAll() {
    return await this.customerService.findAll();
  }

@Get(':id')
async findOne(@Param('id') id: string) {
  const numId = Number(id);
  console.log('Recibido id:', id, 'Convertido a número:', numId);
  if (isNaN(numId)) {
    throw new NotFoundException(`Customer id must be a number`);
  }
  const customer = await this.customerService.findOne(numId);
  if (!customer) {
    throw new NotFoundException(`Customer with id ${id} not found`);
  }
  return customer;
}

  @Put(':id')
  async replace(@Param('id') id: string, @Body() dto: UpdateCustomerDto) {
    return await this.customerService.update(+id, dto);
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateCustomerDto: UpdateCustomerDto,
  ) {
    return await this.customerService.update(+id, updateCustomerDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await this.customerService.remove(+id);
  }
}