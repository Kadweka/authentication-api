
import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthSignUpDto } from './dto/auth-signup.dto';

@Controller('auth')
export class AuthController {
  //injection of Authservice in the constructor
  constructor(private authService: AuthService) {}
  
  //new signUp method
   @Post('/signup')
  async signUp(@Body() authSignUpDto: AuthSignUpDto): Promise<string> {
    return this.authService.signUp(authSignUpDto);
  }
}