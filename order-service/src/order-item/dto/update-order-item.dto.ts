import { IsOptional, IsInt, IsNumber } from 'class-validator';

export class UpdateOrderItemDto {
  @IsOptional()
  @IsInt()
  menuItemId?: number;

  @IsOptional()
  @IsInt()
  quantity?: number;

  @IsOptional()
  @IsNumber()
  price?: number;
}
