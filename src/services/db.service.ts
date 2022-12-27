import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from '@nestjs/typeorm';
import { Product } from 'src/models';

@Injectable()
export class TypeOrmConfigService implements TypeOrmOptionsFactory {
    constructor(private readonly configService: ConfigService) {}

    createTypeOrmOptions(): TypeOrmModuleOptions {
        return {
            type: 'postgres',
            host: 'postgresql',
            port: 5432,
            username: 'user',
            password: 'password',
            database: 'db',
            keepConnectionAlive: true,
            entities: [Product],
            synchronize: true,
        };
    }
}
