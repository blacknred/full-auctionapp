import { ApiProperty } from '@nestjs/swagger';

import { PaginatedResponseDto } from '../../__shared__/dto/response.dto';
import type { Notification } from '../types/notification.type';

export const notificationMock: Notification = {
  offerId: '1c52a84f-3f23-4335-a5df-ea198637e634',
  body: 'notification body',
  createdAt: '2022-08-14 13:55:16.622111',
};

export const notificationPaginationMock = {
  hasMore: true,
  total: 100,
  items: [notificationMock],
};

export class NotificationsResponseDto extends PaginatedResponseDto<Notification> {
  @ApiProperty({ example: notificationPaginationMock, required: false })
  data?: {
    hasMore: boolean;
    total: number;
    items: Notification[];
  };
}
