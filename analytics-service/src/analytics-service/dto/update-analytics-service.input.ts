import { IsString, IsOptional, IsInt } from 'class-validator';

export class UpdateAnalyticsDto {
  // id lo puedes recibir por URL/args en el resolver o controlador,
  // pero lo incluyo por si lo quieres recibir en el body
  @IsOptional()
  @IsInt()
  id?: number;

  @IsOptional()
  @IsString()
  eventType?: string;

  @IsOptional()
  @IsString()
  userId?: string;

  @IsOptional()
  @IsString()
  description?: string;
}
