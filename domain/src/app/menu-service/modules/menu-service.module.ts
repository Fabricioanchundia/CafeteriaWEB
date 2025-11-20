import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Category } from '../entities/category.entity';
import { MenuItem } from '../entities/menu-item.entity';
import { CategoryService } from '../services/category.service';
import { MenuItemService } from '../services/menu-service.service';
import { CategoryController } from '../controllers/category.controller';
import { MenuServiceController } from '../controllers/menu-service.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Category, MenuItem])],
  providers: [CategoryService, MenuItemService],
  controllers: [CategoryController, MenuServiceController],
})
export class MenuServiceModule {}
