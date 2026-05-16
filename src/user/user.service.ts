import { ConflictException, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { OnBoardingDto } from './dto/user.dto';
import * as bcrypt from 'bcrypt';
import { Utils } from 'src/common/utils';
import { InjectRepository } from '@nestjs/typeorm';
import { MailService } from 'src/mail/mail.service';
@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    private readonly mailService: MailService,
  ) {}
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
  async changePassword(email: string, newPassword: string) {
    const user = await this.findUser(email);
    if (!user) {
      throw new Error('User not found');
    }
    const hashedPassword = await bcrypt.hash(newPassword, 12);
    user.password = hashedPassword;
    user.passwordChangeAt = new Date();
    await this.userRepository.save(user);
  }
  async Onboarding(dto: OnBoardingDto) {
    const { email, first_name, last_name, mobile_number } = dto;

    const password = Utils.generatePassword(8);

    const hashedPassword = await bcrypt.hash(password, 12);

    const existingUser = await this.findUser(email);

    if (existingUser) {
      throw new ConflictException('User with this email already exists');
    }

    const user = await this.createUser({
      email,
      firstName: first_name,
      lastName: last_name,
      password: hashedPassword,
      mobileNo: mobile_number,
    });

    const { password: _password, ...sanitizedUser } = user;
    this.mailService.sendMail(email, password);

    return sanitizedUser;
  }
}
