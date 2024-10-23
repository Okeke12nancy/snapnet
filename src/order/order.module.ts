import { Module } from '@nestjs/common';
import { OrdersService } from './order.service';
import { OrdersController } from './order.controller';

import { TypeOrmModule } from '@nestjs/typeorm';
import { Order } from './entities/order.entity';
import { JwtService } from '@nestjs/jwt';
@Module({
  imports: [TypeOrmModule.forFeature([Order])],
  providers: [OrdersService, JwtService],
  controllers: [OrdersController],
  exports: [OrdersService],
})
export class OrderModule {}
