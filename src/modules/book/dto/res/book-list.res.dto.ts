import { Books } from '@core/database/postgres';
import { ApiProperty } from '@nestjs/swagger';

export class BookResDto {
  @ApiProperty({
    type: String,
  })
  id: string;

  @ApiProperty({ type: Number })
  price: number;

  @ApiProperty({ type: String })
  author: string;

  @ApiProperty({ type: String })
  description: string;

  @ApiProperty({ type: String })
  title: string;

  constructor(
    id: string,
    price: number,
    author: string,
    description: string,
    title: string,
  ) {
    this.id = id;
    this.price = price;
    this.author = author;
    this.description = description;
    this.title = title;
  }
}

export class BookListResDto {
  @ApiProperty({ type: BookResDto, isArray: true })
  readonly books: BookResDto[];

  constructor(books: Books[]) {
    this.books = books.map(
      (i) =>
        new BookResDto(i?.id, i?.price, i?.author, i?.description, i?.title),
    );
  }
}
