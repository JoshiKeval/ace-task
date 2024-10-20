import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { AddCartItemReqDto } from './dto/req';
import {
  BooksRepository,
  CartItemsRepository,
  CartRepository,
} from '@core/database/postgres';
import { ErrorMessages, SuccessMessages } from '@core/utils';
import { UpdateCartItemReqDto } from './dto/req/update-cart-item.req.dto';
import { CartDetailsResDto } from './dto/res';

@Injectable()
export class CartService {
  constructor(
    private pgBooksRepo: BooksRepository,
    private pgCartRepo: CartRepository,
    private pgCartItemsRepo: CartItemsRepository,
  ) {}

  async addToCart(userId: string, payload: AddCartItemReqDto) {
    const isBookExist = await this.pgBooksRepo.fetchOne(
      {},
      {},
      { id: payload?.bookId },
    );

    if (!isBookExist) {
      throw new NotFoundException(ErrorMessages.BOOK_NOT_EXIST);
    }

    const isCartExist = await this.pgCartRepo.fetchOne({}, {}, { userId });
    if (!isCartExist) {
      const cart = this.pgCartRepo.create({ userId });
      await this.pgCartRepo.saveCart(cart);
    }

    const cartItem = await this.pgCartItemsRepo.fetchOne(
      {},
      {},
      { bookId: payload?.bookId },
    );

    if (cartItem) {
      throw new BadRequestException(ErrorMessages.BOOK_ALREADY_EXIST);
    }

    const cartItems = await this.pgCartItemsRepo.create({
      bookId: payload.bookId,
      cartId: isCartExist?.id,
      quantity: payload?.quntity,
    });
    await this.pgCartItemsRepo.saveCartItems(cartItems);

    return SuccessMessages.CART_ITEM_ADDED;
  }

  async updateCartItem(
    payload: UpdateCartItemReqDto,
    bookId: string,
    userId: string,
  ) {
    const cartItem = await this.pgCartItemsRepo.fetchOne(
      {},
      {},
      { bookId, cart: { userId } },
    );

    if (!cartItem) {
      throw new NotFoundException(ErrorMessages.BOOK_NOT_EXIST);
    }

    await this.pgCartItemsRepo.updateCartItem(
      {
        cartId: cartItem?.cartId,
      },
      { quantity: payload?.quntity },
    );

    return SuccessMessages.CART_ITEM_UPDATED;
  }

  async deleteCartItem(bookId: string, userId: string) {
    const cartItem = await this.pgCartItemsRepo.fetchOne(
      {},
      {},
      { bookId, cart: { userId } },
    );

    if (!cartItem) {
      throw new NotFoundException(ErrorMessages.BOOK_NOT_EXIST);
    }

    await this.pgCartItemsRepo.softDeleteCartItem({ bookId: cartItem?.bookId });

    return SuccessMessages.CART_ITEM_DELETED;
  }

  async getCartDetails(userId: string): Promise<CartDetailsResDto> {
    const cart = await this.pgCartRepo.fetchOne(
      {
        id: true,
        userId: true,
        cartItems: {
          id: true,
          quantity: true,
          books: {
            id: true,
            description: true,
            price: true,
            title: true,
            author: true,
          },
        },
      },
      ['cartItems', 'cartItems.books'],
      { userId },
    );

    return new CartDetailsResDto(cart.id, userId, cart?.cartItems);
  }
}
