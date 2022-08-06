import { ApiProperty } from '@nestjs/swagger';
import { IsNumberString, IsOptional, IsString } from 'class-validator';
import { PaginatedRequestDto } from '../../__shared__/dto/request.dto';

export class GetCategoriesDto extends PaginatedRequestDto {
  @ApiProperty({ type: 'number', example: 1 })
  @IsOptional()
  @IsNumberString({ message: 'Must be a number' })
  categoryId?: number;

  @ApiProperty({ type: 'string', example: 'bo' })
  @IsOptional()
  @IsString({ message: 'Must be a string' })
  name?: string;
}
