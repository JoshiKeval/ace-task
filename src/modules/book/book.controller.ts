import {
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  UseInterceptors,
} from '@nestjs/common';
import { BookService } from './book.service';
import { TransformInterceptor } from '@core/interceptor';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { BookListResDto, BookResDto } from './dto/res';

@ApiTags('Books Apis')
@UseInterceptors(TransformInterceptor)
@Controller('book')
export class BookController {
  constructor(private service: BookService) {}

  @Get('/')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: 'Get all books',
    description: 'Get all books',
  })
  @ApiResponse({
    description: 'Get books',
    type: BookListResDto,
  })
  async getBooks() {
    return {
      data: await this.service.getBooks(),
    };
  }

  @Get('/:bookId')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: 'Get book by Id',
    description: 'Get book by Id',
  })
  @ApiResponse({
    description: 'Get book by Id',
    type: BookResDto,
  })
  async getBookById(@Param('bookId') bookId: string) {
    return {
      data: await this.service.getBookById(bookId),
    };
  }
}
