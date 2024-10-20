import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, Min } from 'class-validator';

export class UpdateCartItemReqDto {
  @ApiProperty({
    example: 34,
    required: true,
  })
  @Min(1)
  @IsNumber()
  readonly quntity: number;
}
