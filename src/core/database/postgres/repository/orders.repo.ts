import { Inject, Logger } from '@nestjs/common';
import {
  DataSource,
  FindOptionsOrder,
  FindOptionsRelationByString,
  FindOptionsRelations,
  FindOptionsSelect,
  FindOptionsSelectByString,
  FindOptionsWhere,
  Repository,
} from 'typeorm';
import { Orders } from '../entity';

export class OrdersRepository extends Repository<Orders> {
  private readonly logger = new Logger('OrdersRepository');
  constructor(@Inject('DataSource') protected dataSource: DataSource) {
    super(Orders, dataSource.createEntityManager());
  }

  public saveOrder(data: Orders) {
    try {
      return this.save(data);
    } catch (error) {
      this.logger.error(error);
      return undefined;
    }
  }

  public fetchOne(
    select: FindOptionsSelect<Orders> | FindOptionsSelectByString<Orders>,
    relations: FindOptionsRelations<Orders> | FindOptionsRelationByString,
    where: FindOptionsWhere<Orders> | FindOptionsWhere<Orders>[],
  ): Promise<Orders> {
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

  public findAll(
    select: FindOptionsSelect<Orders> | FindOptionsSelectByString<Orders>,
    relations: FindOptionsRelations<Orders> | FindOptionsRelationByString,
    where: FindOptionsWhere<Orders>[] | FindOptionsWhere<Orders>,
    order: FindOptionsOrder<Orders> | undefined = undefined,
    limit: number | undefined = undefined,
    offset: number | undefined = undefined,
  ): Promise<Orders[]> {
    return this.find({
      select,
      relations,
      where,
      ...(order ? { order } : {}),
      ...(limit ? { take: limit as number } : {}),
      ...(offset ? { skip: offset as number } : {}),
    });
  }
}
