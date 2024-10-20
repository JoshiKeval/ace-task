import { Inject, Logger } from '@nestjs/common';
import {
  DataSource,
  FindOptionsRelationByString,
  FindOptionsRelations,
  FindOptionsSelect,
  FindOptionsSelectByString,
  FindOptionsWhere,
  InsertResult,
  ObjectId,
  Repository,
  UpdateResult,
} from 'typeorm';
import { CartItems } from '../entity';
import { QueryDeepPartialEntity } from 'typeorm/query-builder/QueryPartialEntity';
import { UpsertOptions } from 'typeorm/repository/UpsertOptions';

export class CartItemsRepository extends Repository<CartItems> {
  private readonly logger = new Logger('CartItemsRepository');
  constructor(@Inject('DataSource') protected dataSource: DataSource) {
    super(CartItems, dataSource.createEntityManager());
  }

  public saveCartItems(data: CartItems) {
    try {
      return this.save(data);
    } catch (error) {
      this.logger.error(error);
      return undefined;
    }
  }

  public fetchOne(
    select: FindOptionsSelect<CartItems> | FindOptionsSelectByString<CartItems>,
    relations: FindOptionsRelations<CartItems> | FindOptionsRelationByString,
    where: FindOptionsWhere<CartItems> | FindOptionsWhere<CartItems>[],
  ): Promise<CartItems> {
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

  public updateCartItem(
    criteria:
      | string
      | string[]
      | number
      | number[]
      | Date
      | Date[]
      | ObjectId
      | ObjectId[]
      | FindOptionsWhere<CartItems>,
    partialEntity: QueryDeepPartialEntity<CartItems>,
  ): Promise<UpdateResult> {
    try {
      return this.update(criteria, partialEntity);
    } catch (error) {
      this.logger.error(error);
      return undefined;
    }
  }

  public softDeleteCartItem(
    criteria:
      | string
      | string[]
      | number
      | number[]
      | Date
      | Date[]
      | ObjectId
      | ObjectId[]
      | FindOptionsWhere<CartItems>,
  ): Promise<UpdateResult> {
    try {
      return this.softDelete(criteria);
    } catch (error) {
      this.logger.error(error);
      return undefined;
    }
  }

  public upsertCartItem(
    entityOrEntities:
      | QueryDeepPartialEntity<CartItems>
      | QueryDeepPartialEntity<CartItems>[],
    conflictPathsOrOptions: string[] | UpsertOptions<CartItems>,
  ): Promise<InsertResult> {
    try {
      return this.upsert(entityOrEntities, conflictPathsOrOptions);
    } catch (error) {
      this.logger.error(error);
      return undefined;
    }
  }
}
