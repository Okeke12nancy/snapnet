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
import {
  ApiBearerAuth,
  ApiBody,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';

import { CreateOrderRequestDto } from './dto/create-order.dto';
import { UpdateOrderStatusDto } from './dto/update-order-status.dto';
import { OrdersService } from '../order/order.service';
import { Order } from './entities/order.entity';
import { AuthGuard } from 'src/auth/auth.guard';

@ApiBearerAuth('jwt')
@ApiTags('Orders')
@Controller('')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @UseGuards(AuthGuard)
  @Post('/:productId/orders')
  @ApiOperation({ summary: 'Place a new order' })
  @ApiParam({ name: 'product Id', description: 'product ID', example: '12345' })
  @ApiBody({
    type: CreateOrderRequestDto,
    description: 'Details of the order to be created',
  })
  @ApiResponse({
    status: 201,
    description: 'Order created successfully',
    type: Order,
  })
  @ApiResponse({ status: 400, description: 'Bad request' })
  @ApiResponse({ status: 500, description: 'Internal server error' })
  async createOrder(
    @Body() createOrderDto: CreateOrderRequestDto,
    @Request() req: any,
  ): Promise<Order> {
    console.log(req);
    return await this.ordersService.createOrder(req.user.id, createOrderDto);
  }

  @UseGuards()
  @Get('/:orgId/orders/history')
  @ApiOperation({ summary: 'View order history' })
  @ApiParam({ name: 'orgId', description: 'Organization ID', example: '12345' })
  @ApiResponse({
    status: 200,
    description: 'Order history retrieved successfully',
    type: [Order],
  })
  @ApiResponse({ status: 204, description: 'No orders found' })
  @ApiResponse({ status: 400, description: 'Bad request' })
  @ApiResponse({ status: 500, description: 'Internal server error' })
  async getOrderHistory(@Param('orgId') orgId: string): Promise<Order[]> {
    return await this.ordersService.getOrderHistory(orgId);
  }

  @UseGuards()
  @Patch('/:orgId/orders/:orderId/status')
  @HttpCode(200)
  @ApiOperation({ summary: 'Update order status' })
  @ApiParam({ name: 'orgId', description: 'Organization ID', example: '12345' })
  @ApiParam({ name: 'orderId', description: 'Order ID', example: 'abcd1234' })
  @ApiBody({
    type: UpdateOrderStatusDto,
    description: 'New status for the order',
  })
  @ApiResponse({
    status: 200,
    description: 'Order status updated successfully',
    type: Order,
  })
  @ApiResponse({ status: 404, description: 'Order not found' })
  @ApiResponse({ status: 400, description: 'Bad request' })
  @ApiResponse({ status: 500, description: 'Internal server error' })
  async updateOrderStatus(
    @Param('orgId') orgId: string,
    @Param('orderId') orderId: string,
    @Body() updateOrderStatusDto: UpdateOrderStatusDto,
  ): Promise<Order> {
    return await this.ordersService.updateOrderStatus(
      orgId,
      orderId,
      updateOrderStatusDto,
    );
  }

  @UseGuards()
  @Delete('/:orgId/orders/:orderId')
  @ApiOperation({ summary: 'Delete an order' })
  @ApiParam({ name: 'orgId', description: 'Organization ID', example: '12345' })
  @ApiParam({ name: 'orderId', description: 'Order ID', example: 'abcd1234' })
  @ApiResponse({ status: 200, description: 'Order deleted successfully' })
  @ApiResponse({ status: 404, description: 'Order not found' })
  @ApiResponse({ status: 400, description: 'Bad request' })
  @ApiResponse({ status: 500, description: 'Internal server error' })
  async deleteOrder(
    @Param('orgId') orgId: string,
    @Param('orderId') orderId: string,
  ): Promise<void> {
    await this.ordersService.deleteOrder(orgId, orderId);
  }
}
