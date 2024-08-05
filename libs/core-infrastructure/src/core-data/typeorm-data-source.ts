import { DataSource } from 'typeorm';
import { DataSourceOptions } from 'typeorm/data-source/DataSourceOptions';
import { join } from 'path';
import * as dotenv from 'dotenv';
dotenv.config();

const connectionOptions: DataSourceOptions = {
  type: 'postgres',
  host: process.env.POSTGRES_HOST,
  port: parseInt(process.env.POSTGRES_PORT ?? '3000', 10),
  database: process.env.POSTGRES_DB,
  username: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  synchronize: false,
  logging: true,
  entities: [join(__dirname, 'persistence/**/*.schema{.ts,.js}')],
  migrations: [join(__dirname, 'migrations/**/*{.ts,.js}')],
};

export default new DataSource({
  ...connectionOptions,
});
