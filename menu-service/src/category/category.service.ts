import { Injectable } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';

@Injectable()
export class CategoryService {
  private categories: { id: number; name: string }[] = [];
  private idCounter = 1;

  create(dto: CreateCategoryDto) {
    const newCat = { id: this.idCounter++, ...dto };
    this.categories.push(newCat);
    return newCat;
  }

  findAll() {
    return this.categories;
  }

  findOne(id: number) {
    return this.categories.find(c => c.id === id) || null;
  }

  update(id: number, dto: UpdateCategoryDto) {
    const i = this.categories.findIndex(c => c.id === id);
    if (i === -1) return null;
    this.categories[i] = { ...this.categories[i], ...dto };
    return this.categories[i];
  }

  remove(id: number) {
    const i = this.categories.findIndex(c => c.id === id);
    if (i === -1) return null;
    const [deleted] = this.categories.splice(i, 1);
    return deleted;
  }
}
