import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Analytics {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  tipo: string; // Ej: 'ventas', 'usuarios', etc.

  @Column()
  valor: number;

  @Column({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
  fecha: Date;
}
