import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AddressModule } from './app/customer-service/module/address.module';
import {CustomerModule} from './app/customer-service/module/customer-service.module'
import { CategoryModule } from './app/menu-service/modules/category.module';
import { MenuServiceModule } from './app/menu-service/modules/menu-service.module';
import { OrderServiceModule } from './app/order-service/modules/order-service.module';
import { OrderModule } from './app/order-service/modules/order.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost', // o el host de tu servidor
      port: 5432,
      username: 'postgres',
      password: '123',
      database: 'cafeteria_db',
      autoLoadEntities: true,
      synchronize: true, // ⚠️ en producción usar migraciones
    }),
    AddressModule,
    CustomerModule,
    CategoryModule,
    MenuServiceModule,
    OrderServiceModule,
    OrderModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
