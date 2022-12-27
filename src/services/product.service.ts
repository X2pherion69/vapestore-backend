import { Injectable } from '@nestjs/common';
import { Product } from 'src/models';
import { ProductRepository } from 'src/repositories';

@Injectable()
export class ProductService {
    constructor(private readonly productRepository: ProductRepository) {}

    async getAllProducts(): Promise<Product[]> {
        try {
            return await this.productRepository.findAllProducts();
        } catch (error) {
            console.log(error);
        }
    }

    async createProduct(name: string, price: number, brand: string, status: string, nicotin: number): Promise<Product> {
        let product = new Product();
        product.name = name;
        product.price = price;
        product.brand = brand;
        product.status = status;
        product.nicotin = nicotin;

        const productTransaction = this.productRepository.manager.connection.createQueryRunner();
        await productTransaction.startTransaction();
        try {
            product = await productTransaction.manager.save(product);
            await productTransaction.commitTransaction();
        } catch (err) {
            await productTransaction.rollbackTransaction();
            console.log(err);
        } finally {
            await productTransaction.release();
        }
        return product;
    }
}
