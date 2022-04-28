import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthSignUpDto } from './dto/auth-signup.dto';

@Controller('auth')
export class AuthController {
    constructor(
        private authService:AuthService
    ){}
    @Post('/register')
    async signUp(@Body()AuthSignUpDto:AuthSignUpDto):Promise<string>{
        return this.authService.signUp(AuthSignUpDto)
    }
}
