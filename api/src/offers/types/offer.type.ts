import type { Bid } from 'src/bids/types/bid.type';
import type { Category } from 'src/categories/types/category.type';
import type { Profile } from 'src/users/types/profile.type';

export type OfferType = 'sell' | 'buy';
export type OfferStatus = 'active' | 'inactive' | 'failed' | 'finished';

export type Offer = {
  id: string;
  type: OfferType;
  title: string;
  description: string;
  media: string[];
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
};
