import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { CartService } from './cart.service';
import { SuccessMessages } from '@core/utils';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { GetSession } from '@core/decorators';
import { User } from '@core/interfaces';
import { UserAuthGuard } from '@core/guard';
import { TransformInterceptor } from '@core/interceptor';
import { CartDetailsResDto } from './dto/res';
import { AddCartItemReqDto, UpdateCartItemReqDto } from './dto/req';

@ApiTags('Cart Apis')
@UseInterceptors(TransformInterceptor)
@ApiBearerAuth()
@UseGuards(UserAuthGuard)
@Controller('cart')
export class CartController {
  constructor(private service: CartService) {}

  @Post('/')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: ' Add item',
    description: 'Add item',
  })
  @ApiResponse({
    description: SuccessMessages.BOOK_ADDED,
  })
  async addToCart(
    @Body() payload: AddCartItemReqDto,
    @GetSession() user: User,
  ) {
    return {
      data: await this.service.addToCart(user?.id, payload),
    };
  }

  @Patch('/:bookId')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: ' Update cart item',
    description: 'Update cart item',
  })
  @ApiResponse({
    description: SuccessMessages.CART_ITEM_UPDATED,
  })
  async updateCartItem(
    @Body() payload: UpdateCartItemReqDto,
    @Param('bookId') bookId: string,
    @GetSession() user: User,
  ) {
    return {
      data: await this.service.updateCartItem(payload, bookId, user?.id),
    };
  }

  @Delete('/:bookId')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: ' Delete cart item',
    description: 'Delete cart item',
  })
  @ApiResponse({
    description: SuccessMessages.CART_ITEM_DELETED,
  })
  async deleteCartItem(
    @Param('bookId') bookId: string,
    @GetSession() user: User,
  ) {
    return {
      data: await this.service.deleteCartItem(bookId, user?.id),
    };
  }

  @Get('/')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: 'Get cart details',
    description: 'Get cart details',
  })
  @ApiResponse({
    description: SuccessMessages.CART_DETAILS,
    type: CartDetailsResDto,
  })
  async getCartDetails(@GetSession() user: User) {
    return {
      data: await this.service.getCartDetails(user?.id),
    };
  }
}
