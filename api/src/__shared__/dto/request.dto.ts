import { ApiProperty, IntersectionType } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsIn, IsNumber, IsOptional, IsString, Min } from 'class-validator';

export class SortingDto {
  @ApiProperty({ type: 'string', example: 'createdAt' })
  @IsOptional()
  @Type(() => String)
  @IsString({ message: 'Must be a string' })
  'sort.field'?: string;

  @ApiProperty({
    type: 'string',
    example: 'DESC',
    enum: ['ASC', 'DESC'],
  })
  @IsOptional()
  @Type(() => String)
  @IsIn(['ASC', 'DESC'], { message: 'Must be an ASC or DESC' })
  'sort.order'?: 'ASC' | 'DESC';
}

export class OffsetPaginationDto {
  @ApiProperty({ type: 'number', example: 10 })
  @Type(() => Number)
  @IsNumber(null, { message: 'Must be a number' })
  @Min(1)
  limit: number;

  @ApiProperty({ type: 'number', example: 20 })
  @IsOptional()
  @Type(() => Number)
  @IsNumber(null, { message: 'Must be a number' })
  @Min(0)
  offset?: number;
}

export class PaginatedRequestDto extends IntersectionType(
  OffsetPaginationDto,
  SortingDto,
) {}
