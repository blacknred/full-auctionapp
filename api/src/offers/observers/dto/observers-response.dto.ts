import { ApiProperty } from '@nestjs/swagger';

import { PaginatedResponseDto } from '../../../__shared__/dto/response.dto';
import type { Observer } from '../types/observer.type';
import { observerMock } from './observer-response.dto';

export const observerPaginationMock = {
  hasMore: true,
  total: 100,
  items: [observerMock],
};

export class ObserversResponseDto extends PaginatedResponseDto<Observer> {
  @ApiProperty({ example: observerPaginationMock, required: false })
  data?: {
    hasMore: boolean;
    total: number;
    items: Observer[];
  };
}
