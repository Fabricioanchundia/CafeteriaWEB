import { IsString, IsOptional } from 'class-validator';

export class CreateAnalyticsDto {
  @IsString()
  eventType: string;

  @IsOptional()
  @IsString()
  userId?: string;

  @IsOptional()
  @IsString()
  description?: string;
}
