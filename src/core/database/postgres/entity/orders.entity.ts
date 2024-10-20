import {
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  OneToMany,
  Column,
  JoinColumn,
} from 'typeorm';
import { Users } from './users.entity';
import { OrderItems } from './order-items.entity';
import { Base } from './base';

@Entity('orders')
export class Orders extends Base {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Users, (user) => user.cart)
  @JoinColumn({ name: 'user_id' })
  user: Users;
  @Column({ name: 'user_id', type: 'varchar' })
  userId: string;

  @OneToMany(() => OrderItems, (orderItem) => orderItem.order)
  orderItems: OrderItems[];

  @Column({ name: 'order_status', type: 'varchar', length: 20 })
  orderStatus: string;
}
