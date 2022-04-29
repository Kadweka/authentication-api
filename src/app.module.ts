import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfig } from './config/typeorm.config';
import { ExpenseModule } from './expense/expense.module';

@Module({
  // Updated imports to finailize configuration
  imports: [TypeOrmModule.forRoot(typeOrmConfig), AuthModule, ExpenseModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}