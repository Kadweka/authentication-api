import {Repository,EntityRepository} from 'typeorm'
import { User } from './user.entity'
import { AuthSignUpDto } from './dto/auth-signup.dto'
import { ConflictException, InternalServerErrorException } from '@nestjs/common';

@EntityRepository(User)
export class UserRepository extends Repository<User>{
    async signUp(AuthSignUpDto:AuthSignUpDto):Promise<string>{
        const{email,password,firstName,lastName}=AuthSignUpDto;
        const user=new User();
        user.email=email;
        user.password=password;
        user.firstName=firstName;
        user.lastName=lastName;

        try{
            await user.save();
            return "User Created Successfully"
        }catch(error){
            if(error.code === '23505'){
                throw new ConflictException('Email alreay exists');
            }else{
                throw new InternalServerErrorException()
            }
        }
    }
}