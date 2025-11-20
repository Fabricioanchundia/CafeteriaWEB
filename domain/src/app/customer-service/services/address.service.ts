import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateAddressDto } from '../dto/create-address.dto';
import { UpdateAddressDto } from '../dto/update-address.dto';
import { Address } from '../entities/address.entity';
import { Customer } from '../entities/customer.entity';

@Injectable()
export class AddressService {
    constructor(
    @InjectRepository(Address)
    private readonly addressRepository: Repository<Address>,

    @InjectRepository(Customer)
    private readonly customerRepository: Repository<Customer>,
    ) {}

    async create(dto: CreateAddressDto) {
    let customer: Customer | null = null;

    // si viene el customerId lo buscamos
    if (dto.customerId) {
        customer = await this.customerRepository.findOne({
        where: { id: dto.customerId },
        });
        if (!customer) {
        throw new NotFoundException(`Customer con id ${dto.customerId} no encontrado`);
        }
    }

    const newAddress = this.addressRepository.create({
        street: dto.street,
        city: dto.city,
        state: dto.state,
        zipCode: dto.zipCode,
        country: dto.country,
        ...(customer && { customer }),
    });

    return this.addressRepository.save(newAddress);
    }

    findAll() {
    return this.addressRepository.find({
      relations: ['customer'], // para que traiga el customer
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
        throw new NotFoundException(`Customer con id ${dto.customerId} no encontrado`);
        }
        address.customer = customer;
    }

    Object.assign(address, dto);
    return this.addressRepository.save(address);
    }

    async remove(id: number) {
    const address = await this.findOne(id);
    return this.addressRepository.remove(address);
    }
}
