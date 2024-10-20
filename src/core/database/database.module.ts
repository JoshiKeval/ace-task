import { Global, Module } from '@nestjs/common';
import {
  BooksRepository,
  CartItemsRepository,
  CartRepository,
  DbConnection,
  OrderItemsRepository,
  OrdersRepository,
  UsersRepository,
} from './postgres';

const PG_REPOSITORIES = [
  UsersRepository,
  CartItemsRepository,
  CartRepository,
  BooksRepository,
  OrderItemsRepository,
  OrdersRepository,
];

@Global()
@Module({
  providers: [...DbConnection, ...PG_REPOSITORIES],
  exports: [...DbConnection, ...PG_REPOSITORIES],
})
export class DatabaseModule {}
