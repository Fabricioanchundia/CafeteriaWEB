import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AnalyticsModule } from './analytics-service/analytics-service.module';
import { Order } from './analytics-service/entities/order.entity';
import { OrderItem } from './analytics-service/entities/order-item.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres', // ❤️ TUS DATOS
      password: '123',       // ❤️ TUS DATOS
      database: 'Order_db',  // ❤️ MISMO QUE EL ORDER-SERVICE
      entities: [Order, OrderItem],
      synchronize: false,
    }),
    AnalyticsModule,
  ],
})
export class AppModule {}
