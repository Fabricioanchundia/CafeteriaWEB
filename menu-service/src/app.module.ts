import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CategoryModule } from './category/category.module';
import { MenuItemModule } from './menu-item/menu-item.module';

@Module({
    imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost', // o el host de tu servidor
      port: 5432,
      username: 'postgres',
      password: '123',
      database: 'Menuservice_db',
      autoLoadEntities: true,
      synchronize: true, // ⚠️ en producción usar migraciones
    }),
    CategoryModule,
    MenuItemModule,
  ],

  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}


