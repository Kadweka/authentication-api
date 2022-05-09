
import { Body, Controller, Patch,Post, Param, Put} from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthSignUpDto } from 'src/dto/user/auth-signup.dto';
import { AuthSignInDto } from '../dto/user/auth-signin.dto';
import { userJwtResponse } from './user-jwt-response.interface';
import { User } from '../entity/user/user.entity';

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
@Put('/:userId')
 async updateProfile(
  @Param('userId') userId: string,
    @Body() AuthSignUpDto: AuthSignUpDto,
      
  ):Promise<User>{
    // console.log(userId,"USER ID NUMBER",AuthSignUpDto,"TESTING THE INFORMATIONS!!!");
    
    const user=await this.authService.updateProfile(
      Number(userId)
      ,AuthSignUpDto
    )
    console.log(user,'TESTING THE END USER OF THE NEEDED');
    
    return user
  }
}