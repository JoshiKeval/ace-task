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
import { OrderItems } from '../entity';

export class OrderItemsRepository extends Repository<OrderItems> {
  private readonly logger = new Logger('OrderItemsRepository');
  constructor(@Inject('DataSource') protected dataSource: DataSource) {
    super(OrderItems, dataSource.createEntityManager());
  }

  public saveOrderItems(data: OrderItems) {
    try {
      return this.save(data);
    } catch (error) {
      this.logger.error(error);
      return undefined;
    }
  }

  public fetchOne(
    select:
      | FindOptionsSelect<OrderItems>
      | FindOptionsSelectByString<OrderItems>,
    relations: FindOptionsRelations<OrderItems> | FindOptionsRelationByString,
    where: FindOptionsWhere<OrderItems> | FindOptionsWhere<OrderItems>[],
  ): Promise<OrderItems> {
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
