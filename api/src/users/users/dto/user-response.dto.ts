import { ApiProperty } from '@nestjs/swagger';

import { BaseResponseDto } from 'src/__shared__/dto/response.dto';
import type { User } from '../types/user.type';
import { NotificationMethod } from '../types/user.type';

export const userMock: User = {
  username: 'John Foo',
  image: 'https://path-to-profile-avatar.png',
  bio: 'user info',
  rating: 43,
  id: 2,
  createdAt: '2022-08-14 13:55:16.622111',
  identity: {
    email: 'test@email.com',
    phone: '+1 893 287 345',
    notificationMethod: NotificationMethod.EMAIL,
    isAdmin: false,
    isPremium: false,
    currency: 'USD',
    locale: 'en_EN',
    userId: 2,
  },
  stats: {
    offersCnt: 1,
    activeOffersCnt: 0,
    wonOffersCnt: 3,
    bidsCnt: 31,
    activeBidsCnt: 5,
    mediumBidPrice: 590,
    topBidPrice: 1200,
  },
};

export class UserResponseDto extends BaseResponseDto<User> {
  @ApiProperty({ example: userMock, required: false })
  data?: User;
}
