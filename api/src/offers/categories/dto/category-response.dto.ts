import { ApiProperty } from '@nestjs/swagger';

import type { Category } from '../types/category.type';
import { BaseResponseDto } from '../../../__shared__/dto/response.dto';

export const categoryMock: Category = {
  id: 2,
  name: 'books',
  specifications: {
    author: 'The author',
    year: 'Publication year',
  },
  categoryId: 1,
};

export class CategoryResponseDto extends BaseResponseDto<Category> {
  @ApiProperty({ example: categoryMock, required: false })
  data?: Category;
}
