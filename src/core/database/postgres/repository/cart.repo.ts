import { Inject, Logger } from '@nestjs/common';
import {
  DataSource,
  FindOptionsRelationByString,
  FindOptionsRelations,
  FindOptionsSelect,
  FindOptionsSelectByString,
  FindOptionsWhere,
  Repository,
} from 'typeorm';
import { Cart } from '../entity';

export class CartRepository extends Repository<Cart> {
  private readonly logger = new Logger('CartRepository');
  constructor(@Inject('DataSource') protected dataSource: DataSource) {
    super(Cart, dataSource.createEntityManager());
  }

  public saveCart(data: Cart) {
    try {
      return this.save(data);
    } catch (error) {
      this.logger.error(error);
      return undefined;
    }
  }

  public fetchOne(
    select: FindOptionsSelect<Cart> | FindOptionsSelectByString<Cart>,
    relations: FindOptionsRelations<Cart> | FindOptionsRelationByString,
    where: FindOptionsWhere<Cart> | FindOptionsWhere<Cart>[],
  ): Promise<Cart> {
    try {
      return this.findOne({
        select,
        relations,
        where,
      });
    } catch (error) {
      this.logger.error(error);
      return undefined;
    }
  }
}
