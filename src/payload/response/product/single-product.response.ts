import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';

export class SingleProductResponse {
    @ApiProperty({ description: 'Name' })
    @Expose()
    name: string;

    @ApiProperty({ description: 'Price' })
    @Expose()
    price: number;

    @ApiProperty({ description: 'Brand' })
    @Expose()
    brand: string;

    @ApiProperty({ description: 'Status' })
    @Expose()
    status: string;

    @ApiProperty({ description: 'Nicotin' })
    @Expose()
    nicotin: number;
}
