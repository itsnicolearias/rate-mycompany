
export interface IBaseService {
  getAll(
    companyId?: string,
    includeModel?: object,
    page?: number,
    size?: number,
    where?: object,
  ): Promise<any>;

  getOne(
    where: object,
    includeModel?: any,
    companyId?: string,
  ): Promise<any>;

  create(
    body: object,
    companyId?: string,
  ): Promise<any>;

  update(
    body: object,
    where: object,
    companyId?: string,
  ): Promise<any>;

  delete(
    where: object,
    companyId?: string,
  ): Promise<any>;
}