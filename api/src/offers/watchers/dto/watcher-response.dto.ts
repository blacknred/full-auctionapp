import { ApiProperty } from '@nestjs/swagger';
import { offerMock } from 'src/offers/offers/dto/offer-response.dto';

import { userMock } from 'src/users/users/dto/user-response.dto';
import { BaseResponseDto } from '../../../__shared__/dto/response.dto';
import type { Watcher } from '../types/watcher.type';

export const watcherMock: Watcher = {
  user: userMock,
  offer: offerMock,
};

export class WatcherResponseDto extends BaseResponseDto<Watcher> {
  @ApiProperty({ example: watcherMock, required: false })
  data?: Watcher;
}
