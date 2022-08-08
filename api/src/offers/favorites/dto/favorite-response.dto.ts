import { ApiProperty } from '@nestjs/swagger';
import { offerMock } from 'src/offers/offers/dto/offer-response.dto';

import { userMock } from 'src/users/users/dto/user-response.dto';
import { BaseResponseDto } from '../../../__shared__/dto/response.dto';
import type { Favorite } from '../types/favorite.type';

export const favoriteMock: Favorite = {
  user: userMock,
  offer: offerMock,
};

export class FavoriteResponseDto extends BaseResponseDto<Favorite> {
  @ApiProperty({ example: favoriteMock, required: false })
  data?: Favorite;
}
