import { ApiProperty } from '@nestjs/swagger';

import { BaseResponseDto } from 'src/__shared__/dto/response.dto';
import type { Profile } from '../types/profile.type';

export const userMock: Profile = {
  username: 'John Foo',
  image: 'https://path-to-profile-avatar.png',
  bio: 'user info',
  rating: 43,
  userId: 2,
  // email: 'test@email.com',
  // phone: '+1 893 287 345',
  // currency: 'USD',
  // locale: 'en_EN',
  // createdAt: '2022-08-14 13:55:16.622111',
  // //
  // offersCnt: 1,
  // activeOffersCnt: 0,
  // wonOffersCnt: 3,
  // bidsCnt: 31,
  // activeBidsCnt: 5,
  // mediumBidPrice: 590,
  // topBidPrice: 1200,
};

export class UserResponseDto extends BaseResponseDto<Profile> {
  @ApiProperty({ example: userMock, required: false })
  data?: Profile;
}
