import { ApiProperty } from '@nestjs/swagger';
import {
  IsInstance,
  IsNumberString,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

export class CreateCategoryDto {
  @ApiProperty({ type: 'string', example: 'books' })
  @IsString({ message: 'Must be a string' })
  @MinLength(5, { message: 'Must include atleast 5 chars' })
  @MaxLength(500, { message: 'Must include no more than 500 chars' })
  name: string;

  @ApiProperty({
    type: Map,
    example: {
      author: 'The author',
      date: 'Creation date',
    },
  })
  @IsInstance(Map)
  @IsString({ each: true })
  specifications: Map<string, string>;

  @ApiProperty({ type: 'number', example: 1 })
  @IsNumberString({ message: 'Must be a number' })
  categoryId?: number;
}
