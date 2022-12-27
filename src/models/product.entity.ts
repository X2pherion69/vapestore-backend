import { Entity } from 'typeorm';
import { BaseEntity } from './base.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity()
export class Product extends BaseEntity {
    @ApiProperty({ description: 'Name' })
    name: string;

    @ApiProperty({ description: 'Price' })
    price: number;

    @ApiProperty({ description: 'Brand' })
    brand: string;

    @ApiProperty({ description: 'Status' })
    status: string;

    @ApiProperty({ description: 'Nicotin' })
    nicotin: number;
}
