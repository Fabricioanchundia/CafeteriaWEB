import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { MenuItem } from '../entities/menu-item.entity';
import { Category } from '../entities/category.entity';
import { CreateMenuItemDto } from '../dto/create-menu-item.dto';
import { UpdateMenuItemDto } from '../dto/update-menu-item.dto';

@Injectable()
export class MenuItemService {
  constructor(
    @InjectRepository(MenuItem)
    private readonly menuItemRepository: Repository<MenuItem>,

    @InjectRepository(Category)
    private readonly categoryRepository: Repository<Category>,
  ) {}

  async create(dto: CreateMenuItemDto) {
    const category = await this.categoryRepository.findOne({
      where: { id: dto.categoryId },
    });
    if (!category) {
      throw new NotFoundException(`Category con id ${dto.categoryId} no encontrada`);
    }

    const newMenuItem = this.menuItemRepository.create({
      name: dto.name,
      description: dto.description,
      price: dto.price,
      available: dto.available,
      category,
    });

    return this.menuItemRepository.save(newMenuItem);
  }

  async findAll() {
    return this.menuItemRepository.find({
      relations: ['category'], // 👈 igual que en address
    });
  }

  async findOne(id: number) {
    const menuItem = await this.menuItemRepository.findOne({
      where: { id },
      relations: ['category'],
    });
    if (!menuItem) {
      throw new NotFoundException(`MenuItem con id ${id} no encontrado`);
    }
    return menuItem;
  }

  async update(id: number, dto: UpdateMenuItemDto) {
    const menuItem = await this.findOne(id);

    if (dto.categoryId) {
      const category = await this.categoryRepository.findOne({
        where: { id: dto.categoryId },
      });
      if (!category) {
        throw new NotFoundException(`Category con id ${dto.categoryId} no encontrada`);
      }
      menuItem.category = category;
    }

    Object.assign(menuItem, dto);
    return this.menuItemRepository.save(menuItem);
  }

  async remove(id: number) {
    const menuItem = await this.findOne(id);
    return this.menuItemRepository.remove(menuItem);
  }
}
