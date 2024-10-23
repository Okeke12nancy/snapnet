import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { OrderModule } from './order/order.module';
import { UserModule } from './user/user.module';
import { ProductsController } from './products/products.controller';
import { ProductsModule } from './products/products.module';
import { UserController } from './user/user.controller';
import { OrdersController } from './order/order.controller';

@Module({
  imports: [AuthModule, UserModule, OrderModule, ProductsModule],
  controllers: [
    AppController,
    UserController,
    ProductsController,
    OrdersController,
  ],
  providers: [AppService],
})
export class AppModule {}
