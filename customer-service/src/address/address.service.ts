import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateAddressDto } from '../address/dto/create-address.dto';
import { UpdateAddressDto } from '../address/dto/update-address.dto';
import { Address } from '../address/entities/address.entity';
import { Customer } from '../customer/entities/customer.entity';

@Injectable()
export class AddressService {
  constructor(
    @InjectRepository(Address)
    private readonly addressRepository: Repository<Address>,

    @InjectRepository(Customer)
    private readonly customerRepository: Repository<Customer>,
  ) {}

  async create(dto: CreateAddressDto) {
    const customer = await this.customerRepository.findOne({
      where: { id: dto.customerId },
    });

    if (!customer) {
      throw new NotFoundException(
        `Customer con id ${dto.customerId} no encontrado`,
      );
    }

    const newAddress = this.addressRepository.create({
      street: dto.street,
      city: dto.city,
      state: dto.state,
      zipCode: dto.zipCode,
      country: dto.country,
      customer: customer, // ✅ aquí usamos la relación, no customerId
    });

    return this.addressRepository.save(newAddress);
  }

  async findAll() {
    return this.addressRepository.find({
      relations: ['customer'], // ✅ trae también el customer
    });
  }

  async findOne(id: number) {
    const address = await this.addressRepository.findOne({
      where: { id },
      relations: ['customer'],
    });
    if (!address) {
      throw new NotFoundException(`Address con id ${id} no encontrada`);
    }
    return address;
  }

  async update(id: number, dto: UpdateAddressDto) {
    const address = await this.findOne(id);

    if (dto.customerId) {
      const customer = await this.customerRepository.findOne({
        where: { id: dto.customerId },
      });
      if (!customer) {
        throw new NotFoundException(
          `Customer con id ${dto.customerId} no encontrado`,
        );
      }
      address.customer = customer; // ✅ corregido
    }

    Object.assign(address, {
      street: dto.street ?? address.street,
      city: dto.city ?? address.city,
      state: dto.state ?? address.state,
      zipCode: dto.zipCode ?? address.zipCode,
      country: dto.country ?? address.country,
    });

    return this.addressRepository.save(address);
  }

  async remove(id: number) {
    const address = await this.findOne(id);
    return this.addressRepository.remove(address);
  }
}
