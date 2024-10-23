import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Patch,
  Post,
  Query,
  Req,
  Request,
  UseGuards,
} from '@nestjs/common';

import { CreateOrderRequestDto } from './dto/create-order.dto';
import { UpdateOrderStatusDto } from './dto/update-order-status.dto';
import { OrdersService } from '../order/order.service';
import { Order } from './entities/order.entity';
import { AuthGuard } from 'src/auth/auth.guard';
import { IRequest } from 'src/types/types';

// @ApiBearerAuth('jwt')
// @ApiTags('Orders')
@UseGuards(AuthGuard)
@Controller('')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @UseGuards(AuthGuard)
  @Post('/:productId/orders')
  async createOrder(
    @Body() createOrderDto: CreateOrderRequestDto,
    @Req() request: IRequest,
  ): Promise<Order> {
    const user = request.user;
    return await this.ordersService.createOrder(user.id, createOrderDto);
  }

  @UseGuards()
  @Get('/:orderId/orders/history')
  async getOrderHistory(orderId: string): Promise<Order[]> {
    return await this.ordersService.getOrderHistory(orderId);
  }

  @UseGuards()
  @Patch('/:orderId/orders/status')
  @HttpCode(200)
  async updateOrderStatus(
    @Param('orderId') orderId: string,
    @Body() updateOrderStatusDto: UpdateOrderStatusDto,
    @Req() request: IRequest,
  ): Promise<Order> {
    const user = request.user;
    return await this.ordersService.updateOrderStatus(
      orderId,
      updateOrderStatusDto,
    );
  }

  @UseGuards(AuthGuard)
  @Delete('/:orderId/orders')
  async deleteOrder(
    @Param('orderId') orderId: string,
    @Req() request: IRequest,
  ) {
    const user = request.user;
    await this.ordersService.deleteOrder(user.id, orderId);
    return {
      success: 'true',
      message: 'order deleted successfully',
    };
  }
}
