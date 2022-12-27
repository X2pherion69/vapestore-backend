import * as joi from 'joi';
import { ApiProperty } from '@nestjs/swagger';

export class ProductCreateRequestPayload {
    @ApiProperty({ description: 'Name', example: 'Lam gay' })
    name: string;

    @ApiProperty({ description: 'Price', example: 69 })
    price: number;

    @ApiProperty({ description: 'Brand', example: 'Lam giang mai' })
    brand: string;

    @ApiProperty({ description: 'Status', example: 'Available' })
    status: string;

    @ApiProperty({ description: 'Nicotin', example: 50 })
    nicotin: number;
}

export const vProductCreateRequestPayload = joi.object<ProductCreateRequestPayload>({
    name: joi.string().min(3).max(100).required(),
    price: joi.number().required(),
    brand: joi.string().min(3).max(100).required(),
    status: joi.string().min(3).max(100).required(),
    nicotin: joi.number().required(),
});
