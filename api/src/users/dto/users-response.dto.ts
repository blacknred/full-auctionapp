import { ApiProperty } from '@nestjs/swagger';

import { PaginatedResponseDto } from 'src/__shared__/dto/response.dto';
import type { Profile } from '../types/profile.type';
import { userMock } from './user-response.dto';

export const userPaginationMock = {
  hasMore: true,
  total: 100,
  items: [userMock],
};

export class UsersResponseDto extends PaginatedResponseDto<Profile> {
  @ApiProperty({ example: userPaginationMock, required: false })
  data?: {
    hasMore: boolean;
    total: number;
    items: Profile[];
  };
}
