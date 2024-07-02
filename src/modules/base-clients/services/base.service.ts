import { PrismaClient, Prisma } from '@prisma/client';
import boom from '@hapi/boom';
import moment from 'moment';
import { IBaseService } from '../interfaces/base-service.interface';

const prisma = new PrismaClient();

class BaseService implements IBaseService {
  model: any;

  constructor(model: any) {
    this.model = model;
  }

  /**
   * @description method to get all the records easily, this is done so that just by extending the base class, you have access to an entire crud
   * @param companyId
   * @param includeModel
   * @param page
   * @param size
   * @param where
   * @param all
   * @returns {HttpResponse.getSuccessful | boom.badRequest}
   */
  public async getAll(
    companyId?: string,
    includeModel?: object,
    page?: number,
    size?: number,
    where?: Record<string, unknown>,
    all?: boolean,
  ) {
    try {
      let whereCondition = { ...where };
      if (companyId) {
        whereCondition.companyId = companyId;
      }

      const limit = size || 10;
      const offset = page ? (page - 1) * limit : 0;

      const records = await this.model.findMany({
        where: whereCondition,
        skip: offset,
        take: limit,
        include: includeModel,
      });

      const totalCount = await this.model.count({ where: whereCondition });
      const pagesQuantity = Math.ceil(totalCount / limit);

      return { records, totalCount, pagesQuantity };
    } catch (e) {
      throw boom.badRequest(e);
    }
  }

  /**
   * @description method to easily obtain a record through a column, this is done so that by simply extending the base class, you have access to an entire crud
   * @param companyId
   * @param where
   * @param includeModel
   * @returns
   */
  async getOne(
    where: Record<string, unknown>,
    includeModel?: object,
    companyId?: string,
  ) {
    try {
      if (companyId) {
        where.companyId = companyId;
      }

      const record = await this.model.findFirst({
        where,
        include: includeModel,
      });

      if (!record) throw boom.notFound(`${this.model.name} not found`);

      return record;
    } catch (e) {
      throw boom.badRequest(e);
    }
  }

  /**
   * basic method for create a record in the db, body must arrive validated
   * @param companyId
   * @param body
   * @param include
   * @returns {HttpResponse.postSuccessful | boom.badRequest}
   */
  async create(body: any, companyId?: string, include?: any[]) {
    try {
      if (companyId) {
        body.companyId = companyId;
      }

      const record = await this.model.create({
        data: body,
        include,
      });

      return record;
    } catch (e) {
      throw boom.badRequest(e);
    }
  }

  /**
   * update a record in Bd
   * @param companyId
   * @param body
   * @param where
   * @returns {HttpResponse.postSuccessful | boom.badRequest}
   */
  async update(body: any, where: Record<string, unknown>, companyId?: string) {
    try {
      const record = await this.model.findFirst({ where });

      if (!record) throw boom.notFound(`${this.model.name} not found`);

      if (companyId && record.companyId !== companyId) {
        throw boom.unauthorized('You are not authorized to update this record');
      }

      body.updatedAt = moment().toISOString();

      const updatedRecord = await this.model.update({
        where,
        data: body,
      });

      return updatedRecord;
    } catch (e) {
      throw boom.badRequest(e);
    }
  }

  /**
   * basic method for delete a record in the db
   * @param where
   * @param companyId
   * @param physicalDestroy
   * @returns {HttpResponse.deleteSuccessful | boom.badRequest}
   */
  async delete(
    where: Record<string, unknown>,
    companyId?: string,
    physicalDestroy?: boolean,
  ) {
    try {
      const record = await this.model.findFirst({ where });

      if (!record) throw boom.notFound(`${this.model.name} not found`);

      if (companyId && record.companyId !== companyId) {
        throw boom.unauthorized('You are not authorized to delete this record');
      }

      if (physicalDestroy) {
        await this.model.delete({ where });
        return { message: 'Record deleted successfully' };
      }

      const updatedRecord = await this.model.update({
        where,
        data: { deleted: true, updatedAt: moment().toISOString() },
      });
      return { message: 'Record deleted successfully', record: updatedRecord };
    } catch (e) {
      throw boom.badRequest(e);
    }
  }
}

export default BaseService;
