import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';

export class BaseResponsePayload {
    @ApiProperty({ description: 'Id', example: 1 })
    @Expose()
    id: number;

    @ApiProperty({ description: 'Created at', example: '2020-01-01T00:00:00.000Z' })
    @Expose()
    createdAt: Date;

    @ApiProperty({ description: 'Created at', example: '2020-01-01T00:00:00.000Z' })
    @Expose()
    updatedAt: Date;

    @ApiProperty({ description: 'Is deleted', example: false })
    @Expose()
    isDeleted: boolean;
}
