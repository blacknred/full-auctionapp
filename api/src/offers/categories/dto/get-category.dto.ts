import { ApiProperty } from '@nestjs/swagger';
import { IsNumberString } from 'class-validator';

export class GetCategoryDto {
  @ApiProperty({ type: 'number', example: 1 })
  @IsNumberString({ message: 'Must be a number' })
  id: number;
}
