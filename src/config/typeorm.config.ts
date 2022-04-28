import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export const typeOrmConfig: TypeOrmModuleOptions = {
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'kadweka',
  password: 'kadweka',
  database: 'authuser',
  entities: [__dirname + '/../**/*.entity{.ts,.js}'],
  synchronize: true,
};