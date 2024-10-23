import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UserModule } from 'src/user/user.module';
import { UserController } from 'src/user/user.controller';

@Module({
  controllers: [AuthController, UserController],
  providers: [AuthService],
  exports: [AuthService],
  imports: [UserModule],
})
export class AuthModule {}
