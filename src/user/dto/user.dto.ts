import {
    IsBoolean,
    IsEmail,
    IsEnum,
    IsMobilePhone,
    IsOptional,
    IsString,
    Length
} from 'class-validator';

import { UserStatus } from '../enum/user.enums';

export class OnBoardingDto{

    @IsEmail()
    email!:string;

    @IsString()
    @Length(2,50)
    first_name!:string;

    @IsString()
    @Length(2,50)
    last_name!:string;

    @IsMobilePhone('en-IN')
    mobile_number!:string;

    @IsOptional()
    @IsBoolean()
    is_active?:boolean;

    @IsOptional()
    @IsEnum(UserStatus)
    status?:UserStatus;
}