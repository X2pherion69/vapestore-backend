import { ApiProperty } from '@nestjs/swagger';
import { BaseResponsePayload } from '../base.response.payload';
import { Expose } from 'class-transformer';
import { Product } from 'src/models';

export class ProductsListResponsePayload extends BaseResponsePayload {
    @ApiProperty({
        description: 'product',
        example: [
            {
                id: 31,
                createdAt: '2008-07-06T00:00:00.000Z',
                updatedAt: '2006-12-27T00:00:00.000Z',
                isDeleted: false,
                name: 'vape juice',
                price: 150000,
                brand: 'Wotofo',
                status: 'out of order',
                nicotin: 50,
            },
            {
                id: 31,
                createdAt: '2008-07-06T00:00:00.000Z',
                updatedAt: '2006-12-27T00:00:00.000Z',
                isDeleted: false,
                name: 'vape juice',
                price: 150000,
                brand: 'Wotofo',
                status: 'out of order',
                nicotin: 50,
            },
        ],
        isArray: true,
    })
    @Expose()
    product: Product[];
}

export class ProductsListResponseSwagger {
    @ApiProperty({
        description: 'product',
        example: [
            {
                id: 31,
                createdAt: '2008-07-06T00:00:00.000Z',
                updatedAt: '2006-12-27T00:00:00.000Z',
                isDeleted: false,
                name: 'vape juice',
                price: 150000,
                brand: 'Wotofo',
                status: 'out of order',
                nicotin: 50,
            },
            {
                id: 31,
                createdAt: '2008-07-06T00:00:00.000Z',
                updatedAt: '2006-12-27T00:00:00.000Z',
                isDeleted: false,
                name: 'vape juice',
                price: 150000,
                brand: 'Wotofo',
                status: 'out of order',
                nicotin: 50,
            },
        ],
        isArray: true,
    })
    @Expose()
    data: ProductsListResponsePayload;
}
