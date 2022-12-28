import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { Body, Controller, Get, Post, Res, UsePipes } from '@nestjs/common';
import { Product } from 'src/models';
import { ProductService } from 'src/services';
import { ResponseInterface } from 'src/interfaces';
import { Response } from 'express';
import { ProductsListResponsePayload, ProductsListResponseSwagger } from 'src/payload/response';
import { serialize } from 'src/interceptors/serialization.interceptor';
import { ProductCreateRequestPayload, vProductCreateRequestPayload } from 'src/payload/request/product/product-create.request';
import { SingleProductResponse } from 'src/payload/response/product/single-product.response';
import { JoiValidatorPipe } from 'src/pipes/validator.pipe';
@ApiTags('Product')
@Controller('product')
export class ProductController {
    constructor(private readonly productService: ProductService) {}

    @Get('/')
    @ApiResponse({ status: 200, type: ProductsListResponseSwagger })
    @serialize(ProductsListResponsePayload)
    async getListProducts(@Res() res: Response): Promise<ResponseInterface<Product[]>> {
        let products: Product[];
        try {
            products = await this.productService.getAllProducts();
            console.log(products);
        } catch (err) {
            throw err;
        }
        return { data: products, res };
    }

    @Post('/')
    @ApiResponse({ status: 200, type: SingleProductResponse })
    @UsePipes(new JoiValidatorPipe(vProductCreateRequestPayload))
    @serialize(SingleProductResponse)
    async createProduct(@Res() res: Response, @Body() body: ProductCreateRequestPayload): Promise<ResponseInterface<Product>> {
        const { brand, name, nicotin, price, status } = body;
        let product: Product;
        try {
            product = await this.productService.createProduct(name, price, brand, status, nicotin);
        } catch (error) {
            throw error;
        }
        return { data: product, res };
    }
}
