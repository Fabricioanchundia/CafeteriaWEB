import { Controller, Get, Post, Body, Patch, Param, Delete, Put } from '@nestjs/common';
import { MenuItemService } from '../services/menu-service.service';
import { CreateMenuItemDto } from '../dto/create-menu-item.dto';
import { UpdateMenuItemDto } from '../dto/update-menu-item.dto';

@Controller('menu-service') // -> tus rutas quedan /menu-service/...
export class MenuServiceController {
  constructor(private readonly menuService: MenuItemService) {}

  @Post()
  async create(@Body() createMenuItemDto: CreateMenuItemDto) {
    return this.menuService.create(createMenuItemDto);
  }

  @Get()
  async findAll() {
    return this.menuService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.menuService.findOne(+id);
  }

  @Put(':id')
  async replace(@Param('id') id: string, @Body() dto: UpdateMenuItemDto) {
    return this.menuService.update(+id, dto);
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() dto: UpdateMenuItemDto) {
    return this.menuService.update(+id, dto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.menuService.remove(+id);
  }
}
