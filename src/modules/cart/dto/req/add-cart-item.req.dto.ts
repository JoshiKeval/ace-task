import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsUUID, Min } from 'class-validator';

export class AddCartItemReqDto {
  @ApiProperty({
    required: true,
    example: 'bf8d7559-f68f-46fd-958b-a696503d6f79',
  })
  @IsUUID()
  readonly bookId: string;

  @ApiProperty({
    example: 2,
    type: Number,
    required: true,
  })
  @Min(1)
  @IsNumber()
  readonly quntity: number;
}
