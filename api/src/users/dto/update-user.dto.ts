import { ApiProperty, PartialType } from '@nestjs/swagger';
import {
  IsEnum,
  IsOptional,
  IsPhoneNumber,
  IsUrl,
  MinLength,
} from 'class-validator';

import { NotificationMethod } from '../types/user.type';
import { CreateUserDto } from './create-user.dto';

export class UpdateUserDto extends PartialType(CreateUserDto) {
  @ApiProperty({ type: 'string', example: 'user info', required: false })
  @IsOptional()
  @MinLength(1, { message: 'Empty description' })
  bio?: string;

  @ApiProperty({
    type: 'string',
    example: 'https://path-to-profile-avatar.png',
    required: false,
  })
  @IsOptional()
  @IsUrl({ message: 'Not valid url' })
  image?: string;

  @ApiProperty({
    type: 'string',
    example: '+1 893 287 345',
    required: false,
  })
  @IsOptional()
  @IsPhoneNumber(null, { message: 'Non valid phone number' })
  phone?: string;

  @ApiProperty({
    enum: NotificationMethod,
    example: NotificationMethod.EMAIL,
    required: false,
  })
  @IsOptional()
  @IsEnum(NotificationMethod, { message: 'Must be an NotificationMethod enum' })
  urgent_notification_method?: NotificationMethod;
}
