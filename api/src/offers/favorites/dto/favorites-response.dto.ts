import { ApiProperty } from '@nestjs/swagger';

import { PaginatedResponseDto } from '../../../__shared__/dto/response.dto';
import type { Favorite } from '../types/favorite.type';
import { favoriteMock } from './favorite-response.dto';

export const favoritePaginationMock = {
  hasMore: true,
  total: 100,
  items: [favoriteMock],
};

export class FavoritesResponseDto extends PaginatedResponseDto<Favorite> {
  @ApiProperty({ example: favoritePaginationMock, required: false })
  data?: {
    hasMore: boolean;
    total: number;
    items: Favorite[];
  };
}
