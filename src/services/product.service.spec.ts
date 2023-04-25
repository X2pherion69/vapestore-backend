import { Test, TestingModule } from '@nestjs/testing';
import { ProductService } from './product.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product, Category, Comment, Image } from '../models';
import { createMock } from '@golevelup/ts-jest';

describe('ProductService', () => {
  let service: ProductService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ProductService],
    }).useMocker(createMock).compile();

    service = module.get<ProductService>(ProductService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
  it('should be defined', () => {
    expect(service.getProduct).toBeDefined();
  });
  it('should be defined', () => {
    expect(service.checkExistProductCategory).toBeDefined();
  });
  it('should be defined', () => {
    expect(service.checkExistProductCategory).toBeDefined();
  });
  it('should be defined', () => {
    expect(service.checkExistProductImage).toBeDefined();
  });
  it('should be defined', () => {
    expect(service.removeProduct).toBeDefined();
  });
  it('should be defined', () => {
    expect(service.getAllProduct).toBeDefined();
  });
  it('should be defined', () => {
    expect(service.deleteProductImage).toBeDefined();
  });
  it('should be defined', () => {
    expect(service.createProduct).toBeDefined();
  });
});
