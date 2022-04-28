import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UserRepository } from './user.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
@Module({
    imports:[TypeOrmModule.forFeature([UserRepository])],
    controllers:[AuthController],
    providers:[AuthService, UserRepository]
})
export class AuthModule {}
