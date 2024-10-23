import {
  IsArray,
  IsNotEmpty,
  IsNumber,
  IsObject,
  IsString,
} from 'class-validator';

export class CreateOrderRequestDto {
  @IsNotEmpty()
  @IsString()
  customerName: string;

  @IsNotEmpty()
  @IsString()
  customerEmail: string;

  @IsNotEmpty()
  @IsString()
  shippingAddress: string;

  @IsArray()
  orderItems: Array<{
    productId: string;
    quantity: number;
  }>;
}
