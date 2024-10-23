import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateOrderRequestDto } from './dto/create-order.dto';
import { UpdateOrderStatusDto } from './dto/update-order-status.dto';
import { Order } from './entities/order.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class OrdersService {
  constructor(
    @InjectRepository(Order)
    private readonly orderRepository: Repository<Order>,
  ) {}

  async createOrder(
    userId: string,
    createOrderDto: CreateOrderRequestDto,
  ): Promise<Order> {
    const order = this.orderRepository.create({
      ...createOrderDto,
      user: { id: userId },
      createdAt: new Date(),
      updatedAt: new Date(),
    });
    return await this.orderRepository.save(order);
  }

  async getOrderHistory(userId: string): Promise<Order[]> {
    return await this.orderRepository.find({
      where: { user: { id: userId } },
    });
  }

  async updateOrderStatus(
    orderId: string,
    updateOrderStatusDto: UpdateOrderStatusDto,
  ): Promise<Order> {
    const order = await this.orderRepository.findOne({
      where: { id: orderId },
    });

    if (!order) {
      throw new NotFoundException(`Order with ID ${orderId} not found`);
    }

    order.status = updateOrderStatusDto.status;
    order.updatedAt = new Date();

    return await this.orderRepository.save(order);
  }

  async deleteOrder(userId: string, orderId: string): Promise<void> {
    const order = await this.orderRepository.findOne({
      where: { id: orderId, user: { id: userId } },
    });

    if (!order) {
      throw new NotFoundException(`Order with ID ${orderId} not found`);
    }

    await this.orderRepository.remove(order);
  }
}
