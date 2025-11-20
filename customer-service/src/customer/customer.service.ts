import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Customer } from './entities/customer.entity';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { UpdateCustomerDto } from './dto/update-customer.dto';

@Injectable()
export class CustomerService {
  constructor(
    @InjectRepository(Customer)
    private readonly customerRepository: Repository<Customer>,
  ) {}

  async create(createCustomerDto: CreateCustomerDto): Promise<Customer> {
    const customer = this.customerRepository.create(createCustomerDto);
    return await this.customerRepository.save(customer);
  }

  async findAll(): Promise<Customer[]> {
    return await this.customerRepository.find();
  }

async findOne(id: number): Promise<Customer | null> {
  console.log('Buscando cliente con id:', id, 'tipo:', typeof id);
  const customer = await this.customerRepository.findOne({ where: { id } });
  console.log('Resultado de búsqueda:', customer);
  return customer;
}
  async update(id: number, updateCustomerDto: UpdateCustomerDto): Promise<Customer> {
    await this.customerRepository.update(id, updateCustomerDto);
    const updatedCustomer = await this.findOne(id);
    if (!updatedCustomer) {
      throw new Error(`Customer with id ${id} not found`);
    }
    return updatedCustomer;
  }

  async remove(id: number): Promise<void> {
    await this.customerRepository.delete(id);
  }
}
