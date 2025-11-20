import { Controller, Get, Post, Body, Patch, Param, Delete , Put} from '@nestjs/common';
import { CustomerService } from '../services/customer-service.service';
import { CreateCustomerDto } from '../dto/create-customer.dto';
import { UpdateCustomerDto } from '../dto/update-customer.dto';

@Controller('customer-service')
export class CustomerController {
  constructor(
    private readonly customerService: CustomerService,
  ) {}

  @Post()
  create(@Body() createCustomerDto: CreateCustomerDto) {
  return this.customerService.create(createCustomerDto);
  }

  @Get()
  findAll() {
  return this.customerService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
  return this.customerService.findOne(+id);
  }

  @Put(':id')
  replace(@Param('id') id: string, @Body() dto: UpdateCustomerDto) {
    return this.customerService.update(+id, dto);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateCustomerDto: UpdateCustomerDto,
  ) {
    return this.customerService.update(+id, updateCustomerDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
  return this.customerService.remove(+id);
  }
}
