import { ApiProperty } from '@nestjs/swagger';

import { PaginatedResponseDto } from '../../__shared__/dto/response.dto';
import { Category } from '../types/category.type';
import { categoryMock } from './category-response.dto';

export const categoryPaginationMock = {
  hasMore: true,
  total: 100,
  items: [categoryMock],
};

export class CategoriesResponseDto extends PaginatedResponseDto<Category> {
  @ApiProperty({ example: categoryPaginationMock, required: false })
  data?: {
    hasMore: boolean;
    total: number;
    items: Category[];
  };
}
