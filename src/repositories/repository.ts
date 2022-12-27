import { Repository } from 'typeorm';

export class RepositoryService<T> extends Repository<T> {
    protected defaultQuery(tableName: string) {
        return ` AND ${tableName}.status <> 'inactive'`;
    }

    protected queryWithOptions(tableName: string, field: string, value: string[]) {
        return value.map((item) => ` OR ${tableName}.${field} LIKE '${item}'`).join(' ');
    }

    public async findOneByField(field: keyof T, value: any, isDeleted = false): Promise<T> {
        const results = await this.createQueryBuilder().where(`"${field.toString()}" = :value`, { value }).andWhere('is_deleted = :isDeleted', { isDeleted }).getOne();
        return results;
    }

    public async findManyByField(field: keyof T, value: any) {
        return await this.createQueryBuilder().where(`"${field.toString()}" = :value`, { value }).getMany();
    }
}
