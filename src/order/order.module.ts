import { Module } from '@nestjs/common';
import { OrdersService } from './order.service';
import { OrdersController } from './order.controller';

import { TypeOrmModule } from '@nestjs/typeorm';
// import { OrderRepository } from './order.repository';
@Module({
  imports: [TypeOrmModule],
  providers: [OrdersService],
  controllers: [OrdersController],
})
export class OrderModule {}
