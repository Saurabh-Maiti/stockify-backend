import { Controller, Post } from '@nestjs/common';
import { OnBoardingDto } from './dto/user.dto';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService) {}
    @Post('onboarding')
    async onBoarding(dto:OnBoardingDto){
        const response = await this.userService.Onboarding(dto);
        return {
            info: response,
            message: 'User created successfully'
        }
    }
}
