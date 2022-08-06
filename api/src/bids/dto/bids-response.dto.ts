import { ApiProperty } from '@nestjs/swagger';

import { PaginatedResponseDto } from '../../__shared__/dto/response.dto';
import type { Bid } from '../types/bid.type';
import { bidMock } from './bid-response.dto';

export const bidPaginationMock = {
  hasMore: true,
  total: 100,
  items: [bidMock],
};

export class BidsResponseDto extends PaginatedResponseDto<Bid> {
  @ApiProperty({ example: bidPaginationMock, required: false })
  data?: {
    hasMore: boolean;
    total: number;
    items: Bid[];
  };
}
