import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductController } from 'src/controllers/product.controller';
import { ProductService } from 'src/services/product.service';
import { Product } from 'src/models/product.entity';
import { Category, Comment, Image } from 'src/models';

@Module({
  imports: [TypeOrmModule.forFeature([Product, Image, Category, Comment])],
  controllers: [ProductController],
  providers: [ProductService],
  exports: [ProductService],
})
export class ProductModule {}
