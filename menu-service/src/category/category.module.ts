import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CategoryService } from './category.service';
import { CategoryController } from './category.controller';
import { Category } from './entities/category.entity';
import { MenuItem } from '../menu-item/entities/menu-item.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Category,MenuItem]), // 👈 esto es clave
  ],
  controllers: [CategoryController],
  providers: [CategoryService],
  exports: [CategoryService],
})
export class CategoryModule {}




