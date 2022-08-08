import { ApiProperty } from '@nestjs/swagger';
import { userMock } from 'src/users/users/dto/user-response.dto';

import { BaseResponseDto } from '../../../__shared__/dto/response.dto';
import type { Bid } from '../types/bid.type';

export const bidMock: Bid = {
  user: userMock,
  price: 100.25,
  createdAt: '2022-08-14 13:55:16.622111',
  comment: 'price comment',
};

export class BidResponseDto extends BaseResponseDto<Bid> {
  @ApiProperty({ example: bidMock, required: false })
  data?: Bid;
}
