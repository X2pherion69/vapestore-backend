import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateProductDto, FilterProductDto } from 'src/dtos';
import { httpError } from 'src/exception/httpErrors';
import { PagingResult } from 'src/interfaces';
import { Category, Comment, Image, Product } from 'src/models';
import { checkImageName } from 'src/utils';
import { Repository } from 'typeorm';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product) private readonly productRepository: Repository<Product>,
    @InjectRepository(Image) private readonly imageRepository: Repository<Image>,
    @InjectRepository(Category) private readonly categoryRepository: Repository<Category>,
    @InjectRepository(Comment) private readonly commentRepository: Repository<Comment>,
  ) {}

  private readonly alias = 'Product';

  async getAllProduct(queryData: FilterProductDto, isDeleted = false): Promise<PagingResult<Product>> {
    const query = this.productRepository
      .createQueryBuilder(this.alias)
      .orderBy(`${this.alias}.id`, 'DESC')
      .where(`${this.alias}.is_deleted = :isDeleted`, { isDeleted });

    if (queryData.name) {
      query.andWhere(`LOWER(${this.alias}.name) LIKE LOWER(:productName)`, { productName: `%${queryData.name}%` }).take(5);
    }

    query.leftJoinAndSelect(`${this.alias}.image`, 'image', 'image.is_deleted = :isDeleted', { isDeleted });
    query.leftJoinAndSelect(`${this.alias}.category`, 'category', 'category.is_deleted = :isDeleted', { isDeleted });
    const data = await query.getMany();
    const count = await query.getCount();
    return { data, count };
  }

  async createProduct(data: CreateProductDto): Promise<Product> {
    if (await this.checkExistProductName(data.name)) {
      throw httpError.throwExistedError();
    }
    if (await this.checkExistProductCategory(data.categoryId)) {
      throw httpError.throwNotFoundError();
    }
    const product = this.productRepository.create(data);
    return this.productRepository.save(product);
  }

  async getProduct(id: number, isDeleted = false): Promise<Product> {
    const product = await this.productRepository
      .createQueryBuilder(this.alias)
      .where(`${this.alias}.is_deleted = :isDeleted`, { isDeleted })
      .andWhere(`${this.alias}.id = :id`, { id })
      .leftJoinAndSelect(`${this.alias}.image`, 'image', 'image.is_deleted = :isDeleted', { isDeleted })
      .leftJoinAndSelect(`${this.alias}.category`, 'category', 'category.is_deleted = :isDeleted', { isDeleted })
      .getOne();
    if (!product) httpError.throwNotFoundError();
    return product;
  }

  async updateProduct(id: number, attrs: Partial<Product>, isDeleted = false) {
    if (attrs.categoryId && (await this.checkExistProductCategory(attrs.categoryId))) {
      throw httpError.throwNotFoundError();
    }
    const product = await this.productRepository
      .createQueryBuilder(this.alias)
      .where(`${this.alias}.is_deleted = :isDeleted`, { isDeleted })
      .andWhere(`${this.alias}.id = :id`, { id })
      .getOne();
    if (!product) {
      httpError.throwNotFoundError();
    }
    Object.assign(product, attrs);
    return await this.productRepository.save(product);
  }

  async removeProduct(id: number, isDeleted = false) {
    const product = await this.productRepository
      .createQueryBuilder(this.alias)
      .where(`${this.alias}.is_deleted = :isDeleted`, { isDeleted })
      .andWhere(`${this.alias}.id = :id`, { id })
      .getOne();
    const commentsOfThatProduct = await this.commentRepository
      .createQueryBuilder('comment')
      .where('comment.is_deleted = :isDeleted', { isDeleted })
      .getMany();
    const imagesOfThatProduct = await this.imageRepository
      .createQueryBuilder('image')
      .where('image.is_deleted = :isDeleted', { isDeleted })
      .getMany();
    if (!product) httpError.throwNotFoundError();
    await this.commentRepository.remove(commentsOfThatProduct);
    await this.imageRepository.remove(imagesOfThatProduct);
    return this.productRepository.remove(product);
  }

  async checkExistProductName(name: string, isDeleted = false): Promise<boolean> {
    let productName: Product;
    try {
      productName = await this.productRepository
        .createQueryBuilder(this.alias)
        .where(`${this.alias}.is_deleted = :isDeleted`, { isDeleted })
        .andWhere(`${this.alias}.name = :name`, { name })
        .getOne();
    } catch (error) {
      httpError.throwInternalServerError(error);
    }
    if (productName) return true;
    else return false;
  }

  async uploadProductImage(productId, file: Express.Multer.File): Promise<Image> {
    if (checkImageName(file.originalname)) throw httpError.throwNameConventionError();
    if (await this.checkExistProductImage(file.buffer.toString('base64'))) {
      throw httpError.throwExistedError();
    }
    const image = this.imageRepository.create({ name: file.originalname, imageContent: file.buffer.toString('base64'), productId });
    return await this.imageRepository.save(image);
  }

  async updateProductImage(file: Express.Multer.File, imageId: number, isDeleted = false): Promise<Image> {
    if (checkImageName(file.originalname)) throw httpError.throwNameConventionError();
    if (await this.checkExistProductImage(file.buffer.toString('base64'))) {
      throw httpError.throwExistedError();
    }
    const image = await this.imageRepository
      .createQueryBuilder('image')
      .where('image.is_deleted = :isDeleted', { isDeleted })
      .andWhere('image.id = :imageId', { imageId })
      .getOne();
    if (!image) throw httpError.throwNotFoundError();
    const newImage: Partial<Image> = { name: file.originalname, imageContent: file.buffer.toString('base64') };
    Object.assign(image, newImage);
    return await this.imageRepository.save(image);
  }

  async deleteProductImage(imageId: number, isDeleted = false) {
    const image = await this.imageRepository
      .createQueryBuilder('image')
      .where('image.is_deleted = :isDeleted', { isDeleted })
      .andWhere('image.id = :imageId', { imageId })
      .getOne();
    if (!image) throw httpError.throwNotFoundError();
    return await this.imageRepository.remove(image);
  }

  async checkExistProductImage(name: string, isDeleted = false): Promise<boolean> {
    const productImage = await this.imageRepository
      .createQueryBuilder('image')
      .where('image.is_deleted = :isDeleted', { isDeleted })
      .andWhere('image.image_content = :name', { name })
      .getOne();
    if (productImage) return true;
    else return false;
  }

  async checkExistProductCategory(categoryId: number, isDeleted = false): Promise<boolean> {
    const productCategory = await this.categoryRepository
      .createQueryBuilder('category')
      .where('category.is_deleted = :isDeleted', { isDeleted })
      .andWhere('category.id = :categoryId', { categoryId })
      .getOne();
    if (productCategory) return false;
    else return true;
  }
}
