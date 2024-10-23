import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { OrderModule } from './order/order.module';
import { UserModule } from './user/user.module';
import { ProductsController } from './products/products.controller';

@Module({
  imports: [AuthModule, UserModule, OrderModule, ProductsController],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
