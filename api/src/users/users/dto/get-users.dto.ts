import { ApiProperty } from '@nestjs/swagger';
import {
  IsBoolean,
  IsNumberString,
  IsOptional,
  MinLength,
} from 'class-validator';

import { PaginatedRequestDto } from '../../../__shared__/dto/request.dto';

export class GetUsersDto extends PaginatedRequestDto {
  @ApiProperty({ type: 'string', example: 'Joh', required: false })
  @IsOptional()
  @MinLength(3, { message: 'Must have 3 chars at least' })
  username?: string;

  @ApiProperty({ type: 'number', example: 1, required: false })
  @IsOptional()
  @IsNumberString({ message: 'Must be a number' })
  rating?: number;

  @ApiProperty({ type: 'boolean', example: true, required: false })
  @IsOptional()
  @IsBoolean({ message: 'Must be a boolean' })
  isAdmin?: boolean;

  @ApiProperty({ type: 'boolean', example: true, required: false })
  @IsOptional()
  @IsBoolean({ message: 'Must be a boolean' })
  isPremium?: boolean;

  @ApiProperty({ type: 'boolean', example: true, required: false })
  @IsOptional()
  @IsBoolean({ message: 'Must be a boolean' })
  isDeleted?: boolean;
}
