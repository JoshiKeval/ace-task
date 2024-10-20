import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { Base } from './base';

@Entity('books')
export class Books extends Base {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'name', type: 'citext' })
  title: string;

  @Column({ name: 'author', type: 'varchar', length: 50, nullable: true })
  author: string;

  @Column({ name: 'price', type: 'decimal' })
  price: number;

  @Column({ name: 'description', type: 'text', nullable: true })
  description: string;
}
