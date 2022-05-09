import { Repository, EntityRepository } from 'typeorm';
import { User } from '../../entity/user/user.entity';
import { AuthSignUpDto } from 'src/dto/user/auth-signup.dto';
import {
  ConflictException,
  InternalServerErrorException,
} from '@nestjs/common';
import { SignInResponse } from 'src/dto/user/auth-signinresponse.dto';
import * as bcrypt from 'bcrypt';
import { AuthSignInDto } from '../../dto/user/auth-signin.dto';


@EntityRepository(User)
export class UserRepository extends Repository<User> {
  async signUp(authSignUpDto: AuthSignUpDto): Promise<string> {
    const { email, password, firstname, lastname,phoneNumber } = authSignUpDto;

    const user = new User();

    user.salt = await bcrypt.genSalt();
    user.password = await this.hashPassword(password, user.salt);
    user.email = email;
    user.firstname = firstname;
    user.lastname = lastname;
    user.phoneNumber=phoneNumber;

    try {
      await user.save();
      return 'User created successfully';
    } catch (error) {
      if (error.code === '23505') {
        throw new ConflictException('Email already exists');
      } else {
        throw new InternalServerErrorException();
      }
    }
  }
  private async hashPassword(password:string,salt:string):Promise<string>{
    return bcrypt.hash(password,salt)
  }
  async signIn(authSignInToDto:AuthSignInDto):Promise<SignInResponse>{
    const {email,password}=authSignInToDto;
    const user = await this.findOne({email})
    if(user && user.validatePassword(password)){
      const userResponse = new SignInResponse();
      userResponse.firstname=user.firstname;
      userResponse.lastname=user.lastname;
      userResponse.email=user.email
      userResponse.phoneNumber=user.phoneNumber
      return userResponse
    }else{
      return null;
    }
  }
  async editUser(authSignUpDto:AuthSignUpDto,editedUser: User,):Promise<User>{
    const {email,firstname,lastname,phoneNumber,password}=authSignUpDto;
    editedUser.email=email;
    editedUser.firstname=firstname;
    editedUser.lastname=lastname;
    editedUser.phoneNumber=phoneNumber;

    await editedUser.save();

    return editedUser;
  }
}