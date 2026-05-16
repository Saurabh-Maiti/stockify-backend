import { Body, Controller, Patch, Post } from '@nestjs/common';
import { OnBoardingDto, UpdatePasswordDto } from './dto/user.dto';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}
  @Post('onboarding')
  async onBoarding(@Body()dto: OnBoardingDto) {
    const response = await this.userService.Onboarding(dto);
    return {
      info: response,
      message: 'Invitation sent successfully',
    };
  }
  @Patch('update-password')
  async updatePassword(@Body() dto: UpdatePasswordDto) {
    const { email, new_password } = dto;
    await this.userService.changePassword(email, new_password);
    return {
      message: 'Password updated successfully',
    };
  }
}
