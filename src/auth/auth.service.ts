import { Injectable } from '@nestjs/common';
import { LoginDto } from './dto/auth.dto';
import { UserService } from 'src/user/user.service';

@Injectable()
export class AuthService {
    constructor(private readonly userService:UserService) {}
    async login(dto:LoginDto){
        const {email,password} = dto;

        const user= await this.userService.findUser(email);
        if(!user){
            throw new Error('User not found');
        }
        if(user.password !== password){
            throw new Error('Invalid password');
        }
        return {
            id: user.id,
            email: user.email,
            firstName: user.firstName,
            lastName: user.lastName
        };
    }
}
