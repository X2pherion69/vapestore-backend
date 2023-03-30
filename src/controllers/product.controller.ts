import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Patch,
  UsePipes,
  Res,
  UploadedFile,
  UseInterceptors,
  ParseFilePipe,
  MaxFileSizeValidator,
  FileTypeValidator,
  ParseIntPipe,
  Query,
} from '@nestjs/common';
import { ProductService } from 'src/services/product.service';
import { CreateProductDto, vCreateProductDto, UpdateProductDto, vUpdateProductDto, vFilterProductDto, FilterProductDto } from 'src/dtos';
import { Unprotected } from 'nest-keycloak-connect';
import { PagingResult } from 'src/interfaces';
import { Image, Product } from 'src/models';
import { StatusCodes } from 'http-status-codes';
import { QueryJoiValidatorPipe } from '../pipes/queryValidator.pipe';
import { httpError } from 'src/exception/httpErrors';
import { Response } from 'express';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('product')
export class ProductController {
  constructor(private productService: ProductService) {}

  @Unprotected()
  @Get('/')
  @UsePipes(new QueryJoiValidatorPipe(vFilterProductDto))
  async listProducts(@Res() res: Response, @Query() query: FilterProductDto): Promise<Response<PagingResult<Product>>> {
    let products: PagingResult<Product>;
    try {
      products = await this.productService.getAllProduct(query);
    } catch (error) {
      httpError.throwInternalServerError(error);
    }
    return res.status(StatusCodes.OK).send(products);
  }

  @Unprotected()
  @Post('/')
  @UsePipes(new QueryJoiValidatorPipe(vCreateProductDto))
  async createProduct(@Body() body: CreateProductDto, @Res() res: Response): Promise<Response<Product>> {
    let product: Product;
    try {
      product = await this.productService.createProduct(body);
    } catch (error) {
      httpError.throwInternalServerError(error);
    }
    return res.status(StatusCodes.CREATED).send(product);
  }

  @Unprotected()
  @Get(':id')
  async getProduct(@Param('id', ParseIntPipe) id: number, @Res() res: Response): Promise<Response<Product>> {
    let product: Product;
    try {
      product = await this.productService.getProduct(id);
    } catch (error) {
      httpError.throwInternalServerError(error);
    }
    return res.status(StatusCodes.OK).send(product);
  }

  @Unprotected()
  @Delete(':id')
  async removeProduct(@Param('id', ParseIntPipe) id: number, @Res() res: Response): Promise<Response<Product>> {
    try {
      await this.productService.removeProduct(id);
    } catch (error) {
      httpError.throwInternalServerError(error);
    }
    return res.status(StatusCodes.NO_CONTENT).send();
  }

  @Unprotected()
  @Patch(':id')
  @UsePipes(new QueryJoiValidatorPipe(vUpdateProductDto))
  async updateProduct(@Param('id', ParseIntPipe) id: number, @Body() body: UpdateProductDto, @Res() res: Response): Promise<Response<Product>> {
    let product: Product;
    try {
      product = await this.productService.updateProduct(id, body);
    } catch (error) {
      httpError.throwInternalServerError(error);
    }
    return res.status(StatusCodes.OK).send(product);
  }

  @Unprotected()
  @Post('upload-image/:id')
  @UseInterceptors(FileInterceptor('file'))
  async uploadProductImage(
    @Res() res: Response,
    @Param('id', ParseIntPipe) productId: number,
    @UploadedFile(
      new ParseFilePipe({ validators: [new MaxFileSizeValidator({ maxSize: 256000 }), new FileTypeValidator({ fileType: 'image/jpeg' })] }),
    )
    file: Express.Multer.File,
  ): Promise<Response<Image>> {
    let image: Image;
    try {
      image = await this.productService.uploadProductImage(productId, file);
    } catch (error) {
      httpError.throwInternalServerError(error);
    }
    return res.status(StatusCodes.CREATED).send(image);
  }

  @Unprotected()
  @Patch('update-image/:imageId')
  @UseInterceptors(FileInterceptor('file'))
  async updateProductImage(
    @Res() res: Response,
    @Param('imageId', ParseIntPipe) imageId: number,
    @UploadedFile(
      new ParseFilePipe({ validators: [new MaxFileSizeValidator({ maxSize: 256000 }), new FileTypeValidator({ fileType: 'image/jpeg' })] }),
    )
    file: Express.Multer.File,
  ): Promise<Response<Image>> {
    let image: Image;
    try {
      image = await this.productService.updateProductImage(file, imageId);
    } catch (error) {
      httpError.throwInternalServerError(error);
    }
    return res.status(StatusCodes.OK).send(image);
  }

  @Unprotected()
  @Delete('delete-image/:imageId')
  async deleteProductImage(@Res() res: Response, @Param('imageId', ParseIntPipe) imageId: number) {
    try {
      await this.productService.deleteProductImage(imageId);
    } catch (error) {
      httpError.throwInternalServerError(error);
    }
    return res.status(StatusCodes.NO_CONTENT).send();
  }
}
