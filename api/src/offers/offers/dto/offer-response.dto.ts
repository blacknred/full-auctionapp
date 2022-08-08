import { ApiProperty } from '@nestjs/swagger';

import { categoryMock } from 'src/offers/categories/dto/category-response.dto';
import { userMock } from 'src/users/users/dto/user-response.dto';
import { BaseResponseDto } from '../../../__shared__/dto/response.dto';
import type { Offer } from '../types/offer.type';
import { OfferStatus, OfferType } from '../types/offer.type';

export const offerMock: Offer = {
  id: '1c52a84f-3f23-4335-a5df-ea198637e634',
  type: OfferType.SELL,
  title: 'Offer title',
  description: 'Offer description',
  assets: ['https://path-to-file-preview-1.png'],
  createdAt: '2022-08-14 13:55:16.622111',
  endsAt: '2022-10-14 13:55:16.622111',
  specifications: {
    author: 'Rudyard Kipling',
    year: '1894',
  },
  category: categoryMock,
  author: userMock,
  //
  status: OfferStatus.ACTIVE,
  startPrice: 100.25,
  blitzPrice: 200.25,
  priceStep: 20.25,
  currency: 'usd',
  isPromoted: false,
  isAnonimous: false,
  isSingleBid: false,
  bidderMinRating: 30,
  //
  bids: [],
  //
  relation: {
    observed: false,
    bidded: false,
  },
};

export class OfferResponseDto extends BaseResponseDto<Offer> {
  @ApiProperty({ example: offerMock, required: false })
  data?: Offer;
}
