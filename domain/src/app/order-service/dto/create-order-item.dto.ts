import { IsInt, IsNumber } from 'class-validator';

export class CreateOrderItemDto {
  @IsInt()
  menuItemId: number;

  @IsInt()
  quantity: number;

  @IsNumber()
  price: number; // si quieres tomar el precio del menú, este campo puede omitirse y se calcula en el service
}
