import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  CreateDateColumn,
} from 'typeorm';
import { OrderItem } from '../../order-item/entities/order-item.entity';

@Entity('orders')
export class Order {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  customerId: number;

  @Column({ default: 'pending' })
  status: string;

  @CreateDateColumn()
  createdAt: Date;

  @Column('decimal', { precision: 10, scale: 2, default: 0 })
  total: number;

  // 🔥 RELACIÓN CORRECTA
  @OneToMany(() => OrderItem, item => item.order, {
    cascade: true,
  })
  items: OrderItem[];
}
