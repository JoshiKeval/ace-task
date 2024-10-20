import { ApiProperty } from '@nestjs/swagger';
import { ArrayMinSize, ArrayUnique, IsArray, IsUUID } from 'class-validator';

export class PlaceOrderReqDto {
  @ApiProperty({
    description: 'itemIds',
    example: ['20ba3900-989d-4eb0-ae8c-c316b65d2813'],
    isArray: true,
    required: false,
  })
  @IsArray()
  @ArrayMinSize(0)
  @IsUUID('4', { each: true })
  @ArrayUnique()
  readonly itemIds: string[];
}
