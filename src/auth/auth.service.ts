import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { UserRepository } from '../repository/user/user.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { JwtService } from '@nestjs/jwt';
import { AuthSignInDto } from '../dto/user/auth-signin.dto';
import { userJwtResponse } from './user-jwt-response.interface';
import { AuthSignUpDto } from 'src/dto/user/auth-signup.dto';
import { User } from '../entity/user/user.entity';
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
  async updateProfile(userId:number,AuthSignUpDto:AuthSignUpDto):Promise<User>{
    const updateUser=await this.userRepository.findOne(userId);
    console.log(updateUser,'30303030');
    
    if(!updateUser){
      throw new NotFoundException('User Does Not Exist!!')
    }
    return this.userRepository.editUser(AuthSignUpDto,updateUser)
  }
  
}