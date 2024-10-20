import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsString, IsOptional } from 'class-validator';

export class GetOrderDetailsQuery {
  @ApiPropertyOptional({
    example: 'orderId',
    required: false,
  })
  @IsString()
  @IsOptional()
  readonly orderId?: string;
}
