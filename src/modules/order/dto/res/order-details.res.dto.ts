import { ApiProperty } from '@nestjs/swagger';
import { BookResDto } from '../../../book/dto/res';
import { OrderItems } from '@core/database/postgres';

class OrderItemDto {
  @ApiProperty({
    type: String,
  })
  id: string;

  @ApiProperty({
    type: Number,
  })
  quantity: number;

  @ApiProperty({
    type: Number,
  })
  price: number;

  @ApiProperty({ type: BookResDto })
  readonly books: BookResDto;

  constructor(id: string, quantity: number, price: number, books: any) {
    this.id = id;
    this.quantity = quantity;
    this.price = price;
    this.books = new BookResDto(
      books.id,
      books.price,
      books.author,
      books.description,
      books.title,
    );
  }
}

export class OrderDetailsResDto {
  @ApiProperty({
    type: String,
  })
  id: string;

  @ApiProperty({
    type: String,
  })
  userId: string;

  @ApiProperty({
    type: String,
  })
  orderStatus: string;

  @ApiProperty({
    type: [OrderItemDto],
  })
  orderItems: OrderItemDto[];

  constructor(
    id: string,
    userId: string,
    orderStatus: string,
    orderItems: OrderItems[],
  ) {
    this.id = id;
    this.userId = userId;
    this.orderStatus = orderStatus;
    this.orderItems = orderItems.map(
      (i) => new OrderItemDto(i?.id, i?.quantity, i?.price, i?.books),
    );
  }
}
