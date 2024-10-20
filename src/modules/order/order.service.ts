import { BadRequestException, Injectable } from '@nestjs/common';
import { GetOrderDetailsQuery, PlaceOrderReqDto } from './dto/req';
import {
  CartItemsRepository,
  CartRepository,
  OrderItemsRepository,
  OrdersRepository,
} from '@core/database/postgres';
import { In } from 'typeorm';
import { ErrorMessages } from '@core/utils';
import { OrderStatus } from '@core/interfaces';
import { OrderDetailsResDto } from './dto/res';

@Injectable()
export class OrderService {
  constructor(
    private pgCartItemsRepo: CartItemsRepository,
    private pgOrdersRepo: OrdersRepository,
    private pgOrderItemsRepo: OrderItemsRepository,
    private pgCartRepo: CartRepository,
  ) {}

  async placeOrder(userId: string, payload: PlaceOrderReqDto) {
    const cart = await this.pgCartRepo.fetchOne({}, {}, { userId });
    const cartItems = await this.pgCartItemsRepo.find({
      where: { bookId: In(payload?.itemIds) },
      relations: ['books'],
    });
    if (!cartItems.length) {
      throw new BadRequestException(ErrorMessages.BOOK_NOT_EXIST_IN_CART);
    }

    const order = await this.pgOrdersRepo.saveOrder(
      this.pgOrdersRepo.create({
        orderStatus: OrderStatus.PURCHASED,
        userId,
      }),
    );

    const orderItems = cartItems.map((cartItem) => {
      return this.pgOrderItemsRepo.create({
        orderId: order?.id,
        bookId: cartItem?.books?.id,
        price: cartItem?.books?.price,
        quantity: cartItem?.quantity,
      });
    });

    await Promise.all([
      this.pgOrderItemsRepo.save(orderItems),
      this.pgCartItemsRepo.softDeleteCartItem({
        cartId: cart?.id,
        bookId: In(payload?.itemIds),
      }),
    ]);
    return { orderId: order?.id, orderStatus: order?.orderStatus };
  }

  async getOrderDetails(
    userId: string,
    payload: GetOrderDetailsQuery,
  ): Promise<OrderDetailsResDto[]> {
    const where = {
      userId,
      ...(payload?.orderId != undefined ? { id: payload?.orderId } : {}),
    };

    const order = await this.pgOrdersRepo.findAll(
      {
        id: true,
        userId: true,
        orderStatus: true,
        orderItems: {
          orderId: true,
          price: true,
          quantity: true,
          books: { id: true, author: true, description: true },
        },
      },
      ['orderItems', 'orderItems.books'],
      where,
    );

    return order.map(
      (i) =>
        new OrderDetailsResDto(i?.id, userId, i?.orderStatus, i?.orderItems),
    );
  }
}
