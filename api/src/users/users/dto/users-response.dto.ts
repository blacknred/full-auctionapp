import { ApiProperty } from '@nestjs/swagger';

import { PaginatedResponseDto } from 'src/__shared__/dto/response.dto';
import type { User } from '../types/user.type';
import { userMock } from './user-response.dto';

export const userPaginationMock = {
  hasMore: true,
  total: 100,
  items: [userMock],
};

export class UsersResponseDto extends PaginatedResponseDto<User> {
  @ApiProperty({ example: userPaginationMock, required: false })
  data?: {
    hasMore: boolean;
    total: number;
    items: User[];
  };
}
