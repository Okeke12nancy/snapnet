import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from './entities/product.entity';
import { CreateProductRequestDto } from './dto/create-product.dto';
import { UpdateProductDTO } from './dto/update-product.dto';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
  ) {}

  async createProduct(
    createProductDto: CreateProductRequestDto,
  ): Promise<Product> {
    const product = this.productRepository.create({ ...createProductDto });
    return await this.productRepository.save(product);
  }

  async searchProducts(filters: {
    name?: string;
    category?: string;
    minPrice?: number;
    maxPrice?: number;
  }): Promise<Product[]> {
    const queryBuilder = this.productRepository.createQueryBuilder('product');

    if (filters.name) {
      queryBuilder.andWhere('product.name ILIKE :name', {
        name: `%${filters.name}%`,
      });
    }
    if (filters.minPrice) {
      queryBuilder.andWhere('product.price >= :minPrice', {
        minPrice: filters.minPrice,
      });
    }
    if (filters.maxPrice) {
      queryBuilder.andWhere('product.price <= :maxPrice', {
        maxPrice: filters.maxPrice,
      });
    }

    return await queryBuilder.getMany();
  }

  async getProductById(productId: string): Promise<Product> {
    const product = await this.productRepository.findOne({
      where: { id: productId },
    });
    if (!product) {
      throw new NotFoundException('Product not found');
    }
    return product;
  }

  async updateProduct(
    productId: string,
    updateProductDto: UpdateProductDTO,
  ): Promise<Product> {
    const product = await this.getProductById(productId);
    Object.assign(product, updateProductDto);
    return await this.productRepository.save(product);
  }

  async deleteProduct(orgId: string, productId: string): Promise<void> {
    const product = await this.getProductById(productId);
    await this.productRepository.remove(product);
  }

  async getTotalProducts(): Promise<number> {
    return await this.productRepository.count();
  }
}
