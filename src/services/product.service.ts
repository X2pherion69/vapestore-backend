import { Injectable } from '@nestjs/common';
import { Product } from 'src/models';
import { ProductRepository } from 'src/repositories';

@Injectable()
export class ProductService {
    constructor(private readonly productRepository: ProductRepository) {}

    async getAllProducts(): Promise<Product[]> {
        try {
            return await this.getAllProducts();
        } catch (error) {
            console.log(error);
        }
    }
}
