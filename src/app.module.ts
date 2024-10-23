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
import { TypeOrmModule } from '@nestjs/typeorm';
import dataSource from './database/data-source';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';

@Module({
  imports: [
    AuthModule,
    UserModule,
    OrderModule,
    ProductsModule,
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        return {
          type: 'postgres',
          host: configService.get('DB_HOST'),
          port: configService.get('DB_PORT'),
          username: configService.get('DB_USERNAME'),
          password: configService.get('DB_PASSWORD'),
          database: configService.get('DB_DATABASE'),
          autoLoadEntities: true,
          migrationsRun: false,
          logging: true,
          synchronize: true,
          // ssl: {
          //   rejectUnauthorized: false,
          // },
        };
      },
    }),
  ],
  controllers: [
    AppController,
    UserController,
    ProductsController,
    OrdersController,
  ],
  providers: [AppService, JwtService],
})
export class AppModule {}
