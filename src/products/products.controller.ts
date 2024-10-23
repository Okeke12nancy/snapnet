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

import { CreateProductRequestDto } from './dto/create-product.dto';
import { ProductsService } from './products.service';
import { UpdateProductDTO } from './dto/update-product.dto';
import { Product } from './entities/product.entity';

@ApiBearerAuth()
@ApiTags('Products')
@Controller('')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @UseGuards()
  @Post('/:userId/products')
  @ApiOperation({ summary: 'Creates a new product' })
  @ApiParam({
    name: 'product name',
    description: 'new product',
    example: '12345',
  })
  @ApiBody({
    type: CreateProductRequestDto,
    description: 'Details of the product to be created',
  })
  @ApiResponse({
    status: 201,
    description: 'Product created successfully',
    type: Product,
  })
  @ApiResponse({ status: 400, description: 'Bad request' })
  @ApiResponse({ status: 500, description: 'Internal server error' })
  async createProduct(
    @Body() createProductDto: CreateProductRequestDto,
  ): Promise<Product> {
    return await this.productsService.createProduct(createProductDto);
  }

  @Get('/:userId/products/search')
  @ApiOperation({ summary: 'Search for products' })
  @ApiParam({ name: 'product', description: 'product', example: '12345' })
  @ApiResponse({
    status: 200,
    description: 'Products found successfully',
    type: [Product],
  })
  @ApiResponse({ status: 204, description: 'No products found' })
  @ApiResponse({ status: 400, description: 'Bad request' })
  @ApiResponse({ status: 500, description: 'Internal server error' })
  async searchProducts(
    @Query('name') name?: string,
    @Query('minPrice') minPrice?: number,
    @Query('maxPrice') maxPrice?: number,
  ): Promise<Product[]> {
    return await this.productsService.searchProducts({
      name,
      minPrice,
      maxPrice,
    });
  }

  @Get('/:userId/products/:productId')
  @ApiOperation({ summary: 'Get a product by ID' })
  @ApiParam({ name: 'orgId', description: 'Organization ID', example: '12345' })
  @ApiParam({
    name: 'productId',
    description: 'Product ID',
    example: 'abcd1234',
  })
  @ApiResponse({
    status: 200,
    description: 'Product found successfully',
    type: Product,
  })
  @ApiResponse({ status: 404, description: 'Product not found' })
  @ApiResponse({ status: 500, description: 'Internal server error' })
  async getById(@Param('productId') productId: string): Promise<Product> {
    return await this.productsService.getProductById(productId);
  }

  @UseGuards()
  @Patch('/:userId/products/:productId')
  @HttpCode(200)
  @ApiOperation({ summary: 'Update a product' })
  @ApiParam({ name: 'orgId', description: 'Organization ID', example: '12345' })
  @ApiParam({
    name: 'productId',
    description: 'Product ID',
    example: 'abcd1234',
  })
  @ApiBody({
    type: UpdateProductDTO,
    description: 'Details of the product to be updated',
  })
  @ApiResponse({
    status: 200,
    description: 'Product updated successfully',
    type: Product,
  })
  @ApiResponse({ status: 404, description: 'Product not found' })
  @ApiResponse({ status: 400, description: 'Bad request' })
  @ApiResponse({ status: 500, description: 'Internal server error' })
  async updateProduct(
    @Param('productId') productId: string,
    @Body() updateProductDto: UpdateProductDTO,
  ): Promise<Product> {
    return await this.productsService.updateProduct(
      productId,
      updateProductDto,
    );
  }

  @UseGuards()
  @Delete('/:userId/products/:productId')
  @ApiOperation({ summary: 'Delete a product' })
  @ApiParam({ name: 'orgId', description: 'Organization ID', example: '12345' })
  @ApiParam({
    name: 'productId',
    description: 'Product ID',
    example: 'abcd1234',
  })
  @ApiResponse({ status: 200, description: 'Product deleted successfully' })
  @ApiResponse({ status: 404, description: 'Product not found' })
  @ApiResponse({ status: 400, description: 'Bad request' })
  @ApiResponse({ status: 500, description: 'Internal server error' })
  async deleteProduct(
    @Param('userId') orgId: string,
    @Param('productId') productId: string,
  ): Promise<void> {
    await this.productsService.deleteProduct(orgId, productId);
  }
}
