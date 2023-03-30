import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { AuthController } from 'src/controllers';
import { AuthService } from 'src/services';
import { ProductModule } from './product.module';
import { UserModule } from './user.module';

@Module({
  imports: [HttpModule, ProductModule, UserModule],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
