import { ProductController } from 'src/controllers';
import { ProductRepository } from 'src/repositories';
import { ProductService } from 'src/services';
import { Connection } from 'typeorm';
import { Product } from 'src/models';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';

@Module({
    imports: [TypeOrmModule.forFeature([Product])],
    controllers: [ProductController],
    providers: [ProductService, { provide: ProductRepository, useFactory: (connection: Connection) => connection.getCustomRepository(ProductRepository), inject: [Connection] }],
    exports: [ProductService, ProductRepository],
})
export class ProductModule {}
