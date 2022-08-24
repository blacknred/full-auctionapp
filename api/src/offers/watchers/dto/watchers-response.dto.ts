import { ApiProperty } from '@nestjs/swagger';

import { PaginatedResponseDto } from '../../../__shared__/dto/response.dto';
import type { Watcher } from '../types/watcher.type';
import { watcherMock } from './watcher-response.dto';

export const watcherPaginationMock = {
  hasMore: true,
  total: 100,
  items: [watcherMock],
};

export class WatchersResponseDto extends PaginatedResponseDto<Watcher> {
  @ApiProperty({ example: watcherPaginationMock, required: false })
  data?: {
    hasMore: boolean;
    total: number;
    items: Watcher[];
  };
}
