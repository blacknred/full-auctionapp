import { ApiProperty } from '@nestjs/swagger';

import { userMock } from 'src/users/dto/user-response.dto';
import { BaseResponseDto } from '../../__shared__/dto/response.dto';
import type { Observer } from '../types/observer.type';

export const observerMock: Observer = {
  user: userMock,
  offer: offerMock,
};

export class ObserverResponseDto extends BaseResponseDto<Observer> {
  @ApiProperty({ example: observerMock, required: false })
  data?: Observer;
}
