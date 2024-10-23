import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { OrdersController } from 'src/order/order.controller';
import { AuthController } from 'src/auth/auth.controller';

@Module({
  controllers: [UserController, OrdersController, AuthController],
  providers: [UserService],
})
export class UserModule {}
