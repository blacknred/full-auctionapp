import { ApiProperty } from '@nestjs/swagger';

import { PaginatedResponseDto } from '../../__shared__/dto/response.dto';
import type { Offer } from '../types/offer.type';
import { offerMock } from './offer-response.dto';

export const offerPaginationMock = {
  hasMore: true,
  total: 100,
  items: [offerMock],
};

export class OffersResponseDto extends PaginatedResponseDto<Offer> {
  @ApiProperty({ example: offerPaginationMock, required: false })
  data?: {
    hasMore: boolean;
    total: number;
    items: Offer[];
  };
}
