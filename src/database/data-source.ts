import { DataSource } from 'typeorm';
import * as dotenv from 'dotenv';

dotenv.config();

const isDevelopment = process.env.NODE_ENV === 'development';

const dataSource = new DataSource({
  type: process.env.DB_TYPE as 'postgres',
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT, 10) || 5432,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  entities: [__dirname + '/../**/*.entity{.ts,.js}'],
  migrations: [__dirname + '/../migrations/*{.ts,.js}'],
  synchronize: isDevelopment,
  migrationsTableName: 'migrations',
  ssl: process.env.DB_SSL === 'true',
});

export async function initializeDataSource() {
  try {
    if (!dataSource.isInitialized) {
      await dataSource.initialize();
    }
    return dataSource;
  } catch (error) {
    console.error('Error during Data Source initialization:', error);
    throw error;
  }
}

export default dataSource;
