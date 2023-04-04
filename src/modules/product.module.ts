import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductController } from '../controllers/product.controller';
import { ProductService } from '../services/product.service';
import { Product } from '../models/product.entity';
import { Category, Comment, Image } from '../models';

@Module({
  imports: [TypeOrmModule.forFeature([Product, Image, Category, Comment])],
  controllers: [ProductController],
  providers: [ProductService],
  exports: [ProductService],
})
export class ProductModule {}
