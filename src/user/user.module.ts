import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { OrdersController } from 'src/order/order.controller';
import { AuthController } from 'src/auth/auth.controller';
import UserService from './user.service';

@Module({
  controllers: [UserController, OrdersController, AuthController],
  providers: [UserService],
})
export class UserModule {}
