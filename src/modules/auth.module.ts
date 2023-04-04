import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { AuthController } from '../controllers';
import { AuthService } from '../services';
import { ProductModule } from './product.module';
import { UserModule } from './user.module';

@Module({
  imports: [HttpModule, ProductModule, UserModule],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
