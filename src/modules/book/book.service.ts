import { BooksRepository } from '@core/database/postgres';
import { Injectable } from '@nestjs/common';
import { BookListResDto, BookResDto } from './dto/res';

@Injectable()
export class BookService {
  constructor(private pgBooksRepo: BooksRepository) {}

  async getBooks(): Promise<BookListResDto> {
    const books = await this.pgBooksRepo.findAll(
      { id: true, price: true, author: true, description: true, title: true },
      {},
      {},
    );
    return new BookListResDto(books);
  }

  async getBookById(bookId: string): Promise<BookResDto> {
    const { id, price, author, description, title } =
      await this.pgBooksRepo.fetchOne(
        { id: true, price: true, author: true, description: true, title: true },
        {},
        { id: bookId },
      );

    return new BookResDto(id, price, author, description, title);
  }
}
