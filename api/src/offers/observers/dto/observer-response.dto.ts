import { ApiProperty } from '@nestjs/swagger';
import { offerMock } from 'src/offers/offers/dto/offer-response.dto';

import { userMock } from 'src/users/users/dto/user-response.dto';
import { BaseResponseDto } from '../../../__shared__/dto/response.dto';
import type { Observer } from '../types/observer.type';

export const observerMock: Observer = {
  user: userMock,
  offer: offerMock,
};

export class ObserverResponseDto extends BaseResponseDto<Observer> {
  @ApiProperty({ example: observerMock, required: false })
  data?: Observer;
}