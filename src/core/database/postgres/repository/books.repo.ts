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
import { Books } from '../entity';

export class BooksRepository extends Repository<Books> {
  private readonly logger = new Logger('BooksRepository');
  constructor(@Inject('DataSource') protected dataSource: DataSource) {
    super(Books, dataSource.createEntityManager());
  }

  public saveBooks(data: Books) {
    try {
      return this.save(data);
    } catch (error) {
      this.logger.error(error);
      return undefined;
    }
  }

  public fetchOne(
    select: FindOptionsSelect<Books> | FindOptionsSelectByString<Books>,
    relations: FindOptionsRelations<Books> | FindOptionsRelationByString,
    where: FindOptionsWhere<Books> | FindOptionsWhere<Books>[],
  ): Promise<Books> {
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
    select: FindOptionsSelect<Books> | FindOptionsSelectByString<Books>,
    relations: FindOptionsRelations<Books> | FindOptionsRelationByString,
    where: FindOptionsWhere<Books>[] | FindOptionsWhere<Books>,
    order: FindOptionsOrder<Books> | undefined = undefined,
    limit: number | undefined = undefined,
    offset: number | undefined = undefined,
  ): Promise<Books[]> {
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
