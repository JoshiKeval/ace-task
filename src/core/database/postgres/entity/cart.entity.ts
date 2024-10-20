import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Users } from './users.entity';
import { CartItems } from './cart-items.entity';
import { Base } from './base';

@Entity('carts')
export class Cart extends Base {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Users, (user) => user.cart)
  @JoinColumn({ name: 'user_id' })
  user: Users;
  @Column({ name: 'user_id', type: 'varchar' })
  userId: string;

  @OneToMany(() => CartItems, (cartItem) => cartItem.cart)
  cartItems: CartItems[];
}
