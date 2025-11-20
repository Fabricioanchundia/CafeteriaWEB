import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MenuItemService } from './menu-item.service';
import { MenuServiceController } from './menu-item.controller';
import { MenuItem } from '../menu-item/entities/menu-item.entity';
import { Category } from '../category/entities/category.entity';
@Module({
  imports: [TypeOrmModule.forFeature([MenuItem, Category])],
  controllers: [MenuServiceController],
  providers: [MenuItemService],
  exports: [MenuItemService],
})
export class MenuItemModule {}
