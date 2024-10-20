import { ApiProperty } from '@nestjs/swagger';
import { BookResDto } from '../../../book/dto/res';
import { CartItems } from '@core/database/postgres';

class CartItemDto {
  @ApiProperty({
    type: String,
  })
  id: string;

  @ApiProperty({
    type: Number,
  })
  quantity: number;

  @ApiProperty({ type: BookResDto })
  readonly books: BookResDto;

  constructor(id: string, quantity: number, books: any) {
    this.id = id;
    this.quantity = quantity;
    this.books = new BookResDto(
      books.id,
      books.price,
      books.author,
      books.description,
      books.title,
    );
  }
}

export class CartDetailsResDto {
  @ApiProperty({
    type: String,
  })
  id: string;

  @ApiProperty({
    type: String,
  })
  userId: string;

  @ApiProperty({
    type: [CartItemDto],
  })
  cartItems: CartItemDto[];

  constructor(id: string, userId: string, cartItems: CartItems[]) {
    this.id = id;
    this.userId = userId;
    this.cartItems = cartItems.map(
      (i) => new CartItemDto(i?.id, i?.quantity, i?.books),
    );
  }
}
