import type { Bid } from 'src/bids/types/bid.type';
import type { Category } from 'src/categories/types/category.type';
import type { Profile } from 'src/users/types/profile.type';

export enum OfferType {
  SELL = 'sell',
  BUY = 'buy',
}

export enum OfferStatus {
  ACTIVE = 'active',
  INACTIVE = 'inactive',
  FAILED = 'failed',
  FINISHED = 'finished',
}

export type Offer = {
  id: string;
  type: OfferType;
  title: string;
  description: string;
  assets: string[];
  createdAt: string;
  endsAt: string;
  specifications: Record<string, any>;
  category: Category;
  author: Profile;
  //
  status: OfferStatus;
  startPrice: number;
  blitzPrice: number;
  priceStep?: number;
  currency: string;
  isPromoted: boolean;
  isAnonimous: boolean;
  isSingleBid: boolean;
  bidderMinRating?: number;
  //
  bids: Bid[];
  //
  relation: {
    observed: boolean;
    bidded: boolean;
  };
};
