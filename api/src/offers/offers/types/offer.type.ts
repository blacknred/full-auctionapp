import type { Bid } from 'src/offers/bids/types/bid.type';
import type {
  Category,
  CategorySpecifications,
} from 'src/offers/categories/types/category.type';
import type { Profile } from 'src/users/users/types/profile.type';

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
  specifications: CategorySpecifications;
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
