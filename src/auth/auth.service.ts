import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserRepository } from './user.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthSignUpDto } from './dto/auth-signup.dto';
import { JwtService } from '@nestjs/jwt';
import { AuthSignInDto } from './dto/auth-signin.dto';
import { userJwtResponse } from './user-jwt-response.interface';
@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserRepository)
    private userRepository: UserRepository,
    private jwtService: JwtService,
  ) {}
  async signUp(authSignUpDto: AuthSignUpDto): Promise<string> {
    return this.userRepository.signUp(authSignUpDto);
  }
  async signIn(AuthSignInDto:AuthSignInDto):Promise<userJwtResponse>{
    const userResult = await this.userRepository.signIn(AuthSignInDto);

    if(!userResult){
      throw new UnauthorizedException("Invalid Credentials!")
    }
    const payload={userResult};
    const accessToken=await this.jwtService.sign(payload);
    const signInResponse:userJwtResponse={user:userResult,accessToken}
    return signInResponse
  }
}