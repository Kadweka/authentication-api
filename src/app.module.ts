import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthController } from './auth/auth.controller';
import { AuthService } from './auth/auth.service';
import { AuthModule } from './auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfig } from 'typeorm.config';
@Module({
  imports: [TypeOrmModule.forRoot(typeOrmConfig), AuthModule],
  controllers: [AppController, AuthController],
  providers: [AppService,AuthModule, AuthService],
})
export class AppModule {}
