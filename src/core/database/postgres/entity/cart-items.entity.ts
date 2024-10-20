import {
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  Column,
  JoinColumn,
} from 'typeorm';
import { Books } from './books.entity';
import { Cart } from './cart.entity';
import { Base } from './base';

@Entity('cart_items')
export class CartItems extends Base {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Cart, (cart) => cart.cartItems)
  @JoinColumn({ name: 'cart_id' })
  cart: Cart;
  @Column({ name: 'cart_id', type: 'varchar' })
  cartId: string;

  @ManyToOne(() => Books)
  @JoinColumn({ name: 'book_id' })
  books: Books;
  @Column({ name: 'book_id', type: 'varchar' })
  bookId: string;

  @Column({ name: 'quantity', type: 'decimal' })
  quantity: number;
}
