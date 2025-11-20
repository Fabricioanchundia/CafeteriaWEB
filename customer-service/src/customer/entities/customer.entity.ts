import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Address } from '../../address/entities/address.entity';

@Entity()
export class Customer {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column({ nullable: true })
  phone: string;

  // 👇 Relación con direcciones
  @OneToMany(() => Address, (address) => address.customer, { cascade: true })
  addresses: Address[];
}
