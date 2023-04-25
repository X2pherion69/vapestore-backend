import { Test, TestingModule } from '@nestjs/testing';
import { ProductController } from './product.controller';
import { ProductService } from '../services/product.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Category, Image, Product, Comment } from '../models';
import { CreateProductDto, UpdateProductDto } from 'src/dtos';
import { Response } from 'express';
import { ModuleMocker, MockFunctionMetadata } from 'jest-mock';
import { createMock } from '@golevelup/ts-jest';

const moduleMocker = new ModuleMocker(global)

describe('ProductController', () => {
  let controller: ProductController;
  let service: ProductService;

  const statusResponseMock = {
    send: jest.fn((x) => x),
  };

  const responseMock = {
    status: jest.fn(() => statusResponseMock),
    send: jest.fn((x) => x),
  } as unknown as Response;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProductController],
    }).useMocker(createMock).compile();

    controller = module.get<ProductController>(ProductController);
    service = module.get<ProductService>(ProductService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should be defined', () => {
    expect(controller.createProduct).toBeDefined();
  });

  it('should be defined', () => {
    expect(controller.getProduct).toBeDefined();
  });

  it('should be defined', () => {
    expect(controller.listProducts).toBeDefined();
  });

  it('should be defined', () => {
    expect(controller.updateProduct).toBeDefined();
  });

  it('should be defined', () => {
    expect(controller.removeProduct).toBeDefined();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should get a list of products', async () => {
    const productResult: Product[] = [
      {
        name: 'product',
        price: 15000,
        type: 'saltnc',
        volume: 100,
        origin: 'USA',
        quantity: 10,
        description: 'Saltnic',
        nicotine: 60,
        categoryId: 4,
        comment: [],
        image: [],
        category: new Category(),
        id: 2,
        createdAt: undefined,
        updatedAt: undefined,
        isDeleted: false,
        toJSON: function (): Record<string, any> {
          return;
        },
        beforeInsert: function (): void {
          return;
        },
        beforeUpdate: function (): void {
          return;
        },
        afterLoad: function (): void {
          return;
        },
        afterInsert: function (): void {
          return;
        },
      },
      {
        name: 'product',
        price: 15000,
        type: 'saltnic',
        volume: 100,
        origin: 'USA',
        quantity: 10,
        description: 'Saltnic',
        nicotine: 60,
        categoryId: 4,
        comment: [],
        image: [],
        category: new Category(),
        id: 1,
        createdAt: undefined,
        updatedAt: undefined,
        isDeleted: false,
        toJSON: function (): Record<string, any> {
          return;
        },
        beforeInsert: function (): void {
          return;
        },
        beforeUpdate: function (): void {
          return;
        },
        afterLoad: function (): void {
          return;
        },
        afterInsert: function (): void {
          return;
        },
      },
    ];

    const statusResponseMock = {
      send: jest.fn((x) => x),
    };

    const responseMock = {
      status: jest.fn(() => statusResponseMock),
      send: jest.fn((x) => x),
    } as unknown as Response;

    jest.spyOn(service, 'getAllProduct').mockImplementation(async () => ({ count: productResult.length, data: productResult }));
    expect(await controller.listProducts(responseMock)).toEqual({ count: productResult.length, data: productResult });
  });

  it('should create a product', async () => {
    const request: CreateProductDto = {
      name: 'product',
      price: 15000,
      type: 'saltnic',
      volume: 100,
      origin: 'USA',
      quantity: 10,
      description: 'Saltnic',
      nicotine: 60,
      categoryId: 4,
    };

    const productResult: Product = {
      name: 'product',
      price: 15000,
      type: 'saltnic',
      volume: 100,
      origin: 'USA',
      quantity: 10,
      description: 'Saltnic',
      nicotine: 60,
      categoryId: 4,
      comment: [],
      image: [],
      category: new Category(),
      id: 2,
      createdAt: undefined,
      updatedAt: undefined,
      isDeleted: false,
      toJSON: function (): Record<string, any> {
        return;
      },
      beforeInsert: function (): void {
        return;
      },
      beforeUpdate: function (): void {
        return;
      },
      afterLoad: function (): void {
        return;
      },
      afterInsert: function (): void {
        return;
      },
    };

    const statusResponseMock = {
      send: jest.fn((x) => x),
    };

    const responseMock = {
      status: jest.fn(() => statusResponseMock),
      send: jest.fn((x) => x),
    } as unknown as Response;

    jest.spyOn(service, 'createProduct').mockImplementation(async () => productResult);
    expect(await controller.createProduct(request, responseMock)).toEqual(productResult);
  });

  it('should delete a product', async () => {
    const productResult: Product = {
      name: 'product',
      price: 15000,
      type: 'saltnic',
      volume: 100,
      origin: 'USA',
      quantity: 10,
      description: 'Saltnic',
      nicotine: 60,
      categoryId: 4,
      comment: [],
      image: [],
      category: new Category(),
      id: 2,
      createdAt: undefined,
      updatedAt: undefined,
      isDeleted: false,
      toJSON: function (): Record<string, any> {
        return;
      },
      beforeInsert: function (): void {
        return;
      },
      beforeUpdate: function (): void {
        return;
      },
      afterLoad: function (): void {
        return;
      },
      afterInsert: function (): void {
        return;
      },
    };

    jest.spyOn(service, 'removeProduct').mockImplementation(async () => productResult);
    expect(await controller.removeProduct(productResult.id, responseMock)).toEqual(undefined);
  });

  it('should update a product', async () => {
    const request: UpdateProductDto = {
      name: 'updated product',
      price: 150000,
      type: 'saltnicc',
      volume: 100,
      origin: 'USAA',
      quantity: 10,
      description: 'Saltnic',
      nicotine: 60,
      categoryId: 4,
    };

    const productResult: Product = {
      name: 'updated product',
      price: 150000,
      type: 'saltnicc',
      volume: 100,
      origin: 'USAA',
      quantity: 10,
      description: 'Saltnic',
      nicotine: 60,
      categoryId: 4,
      comment: [],
      image: [],
      category: new Category(),
      id: 2,
      createdAt: undefined,
      updatedAt: undefined,
      isDeleted: false,
      toJSON: function (): Record<string, any> {
        return;
      },
      beforeInsert: function (): void {
        return;
      },
      beforeUpdate: function (): void {
        return;
      },
      afterLoad: function (): void {
        return;
      },
      afterInsert: function (): void {
        return;
      },
    };

    jest.spyOn(service, 'updateProduct').mockImplementation(async () => productResult);
    expect(await controller.updateProduct(productResult.id, request, responseMock)).toBe(productResult);
  });
});
