import { ApiProperty } from '@nestjs/swagger';
import { IsNumberString, IsOptional, MinLength } from 'class-validator';

import { OffsetPaginationDto } from '../../../__shared__/dto/request.dto';

export class GetCategoriesDto extends OffsetPaginationDto {
  @ApiProperty({ type: 'number', example: 1, required: false })
  @IsOptional()
  @IsNumberString({ message: 'Must be a number' })
  categoryId?: number;

  @ApiProperty({ type: 'string', example: 'boo', required: false })
  @IsOptional()
  @MinLength(3, { message: 'Must have 3 chars at least' })
  query?: string;
}
