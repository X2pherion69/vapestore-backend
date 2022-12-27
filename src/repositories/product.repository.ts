import { Product } from 'src/models';
import { EntityRepository } from 'typeorm';
import { RepositoryService } from './repository';

@EntityRepository(Product)
export class ProductRepository extends RepositoryService<Product> {
    private readonly alias = 'product';

    async findAllProducts({ is_deleted = false }): Promise<Product[]> {
        return this.createQueryBuilder(this.alias).orderBy(`${this.alias}.id`, 'DESC').andWhere(`${this.alias}.is_deleted = is_deleted`, { is_deleted }).getMany();
    }
}
