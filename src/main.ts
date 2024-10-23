import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
// import { initializeDataSource } from './database/data-source';
import { config } from 'dotenv';
async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  // try {
  //   await initializeDataSource();
  //   console.log('Data Source has been initialized!');
  // } catch (err) {
  //   console.error('Error during Data Source initialization', err);
  //   process.exit(1);
  // }

  app.enableCors();
  app.setGlobalPrefix('api/v1');

  const options = new DocumentBuilder()
    .setTitle('Snapnet')
    .setDescription('API Doc from team Starlight')
    .setVersion('1.0')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api/docs', app, document);

  const configService = app.get<ConfigService>(ConfigService);
  const port = configService.get<number>('server.port') || 3000; // Default to 3000 if not set
  await app.listen(port);
}

bootstrap().catch((err) => {
  console.error('Error during bootstrap', err);
  process.exit(1);
});
