import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { OnBoardingDto } from './dto/user.dto';
import * as bcrypt from 'bcrypt';
@Injectable()
export class UserService {
  constructor(private readonly userRepository: Repository<User>) {}
  async findUser(email: string) {
    return await this.userRepository.findOne({
      where: {
        email: email,
      },
    });
  }
  async createUser(data: Partial<User>) {
    const user = this.userRepository.create(data);
    return await this.userRepository.save(user);
  }

  async Onboarding(dto: OnBoardingDto) {
    const { email, first_name, last_name, password, mobile_number } = dto;

    const hashedPassword = await bcrypt.hash(password, 12);

    const existingUser = await this.findUser(email);

    if (existingUser) {
      throw new Error('User with this email already exists');
    }

    const user = await this.createUser({
      email,
      firstName: first_name,
      lastName: last_name,
      password: hashedPassword,
      mobileNo: mobile_number,
    });

    const { password: _password, ...sanitizedUser } = user;

    return sanitizedUser;
  }
}
