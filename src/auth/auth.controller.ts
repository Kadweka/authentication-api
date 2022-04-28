
import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthSignUpDto } from './dto/auth-signup.dto';
import { AuthSignInDto } from './dto/auth-signin.dto';
import { userJwtResponse } from './user-jwt-response.interface';

@Controller('auth')
export class AuthController {
  //injection of Authservice in the constructor
  constructor(private authService: AuthService) {}
  
  //new signUp method
   @Post('/signup')
  async signUp(@Body() authSignUpDto: AuthSignUpDto): Promise<string> {
    return this.authService.signUp(authSignUpDto);
  }

  @Post('/signin')
  async signIn(@Body() AuthSignInDto:AuthSignInDto):Promise<userJwtResponse>{
    return this.authService.signIn(AuthSignInDto)
  }
}