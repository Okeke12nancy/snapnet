import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UserModule } from 'src/user/user.module';
import { UserController } from 'src/user/user.controller';
import { JwtModule, JwtService } from '@nestjs/jwt';
import UserService from 'src/user/user.service';
import { JwtStrategy } from './jwt.strategy';

@Module({
  controllers: [AuthController, UserController],
  providers: [AuthService, JwtStrategy],
  exports: [AuthService],
  imports: [UserModule, JwtModule.register({})],
})
export class AuthModule {}
