import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { OrdersController } from 'src/order/order.controller';
import { AuthController } from 'src/auth/auth.controller';
import UserService from './user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { OrderModule } from 'src/order/order.module';
import { AuthModule } from 'src/auth/auth.module';
import { ProductsModule } from 'src/products/products.module';

@Module({
  controllers: [UserController, OrdersController, AuthController],
  providers: [UserService],
  exports: [UserService],
  imports: [TypeOrmModule.forFeature([User]), OrderModule],
})
export class UserModule {}
