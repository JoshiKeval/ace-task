import {
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  Column,
  JoinColumn,
} from 'typeorm';
import { Orders } from './orders.entity';
import { Books } from './books.entity';
import { Base } from './base';

@Entity('order_items')
export class OrderItems extends Base {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Orders, (order) => order.orderItems)
  @JoinColumn({ name: 'order_id' })
  order: Orders;
  @Column({ name: 'order_id', type: 'varchar' })
  orderId: string;

  @ManyToOne(() => Books)
  @JoinColumn({ name: 'book_id' })
  books: Books;
  @Column({ name: 'book_id', type: 'varchar' })
  bookId: string;

  @Column({ name: 'quantity', type: 'decimal' })
  quantity: number;

  @Column({ name: 'price', type: 'decimal' })
  price: number;
}
