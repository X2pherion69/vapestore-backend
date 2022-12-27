import { ApiTags } from '@nestjs/swagger';
import { Controller, Get, Res } from '@nestjs/common';
import { Product } from 'src/models';
import { ProductService } from 'src/services';
import { ResponseInterface } from 'src/interfaces';
import { Response } from 'express';
@ApiTags('Product')
@Controller('product')
export class ProductController {
    constructor(private readonly productService: ProductService) {}

    @Get('/')
    async getListProducts(@Res() res: Response): Promise<ResponseInterface<Product[]>> {
        let products: Product[];
        try {
            products = await this.productService.getAllProducts();
        } catch (err) {
            throw err;
        }
        return { data: products, res };
    }
}
