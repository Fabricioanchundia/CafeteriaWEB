import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AddressModule } from './address/address.module';
import {CustomerModule} from './customer/customer.module';
import { AppService } from './app.service';
import { AppController } from './app.controller';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost', // o el host de tu servidor
      port: 5432,
      username: 'postgres',
      password: '123',
      database: 'customer_db',
      autoLoadEntities: true,
      synchronize: true, // ⚠️ en producción usar migraciones
    }),
    AddressModule,
    CustomerModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
