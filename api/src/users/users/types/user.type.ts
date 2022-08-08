export enum NotificationMethod {
  EMAIL = 'email',
  PHONE = 'phone',
}

export type Identity = {
  email: string;
  phone: string;
  isAdmin: boolean;
  isPremium: boolean;
  notificationMethod: NotificationMethod;
  currency: string;
  locale: string;
  userId: number;
};

export type UserStats = {
  offersCnt: number;
  activeOffersCnt: number;
  wonOffersCnt: number;
  bidsCnt: number;
  activeBidsCnt: number;
  mediumBidPrice: number;
  topBidPrice: number;
};

export type User = {
  id: number;
  username: string;
  image?: string;
  bio?: string;
  rating: number;
  createdAt: string;
  deletedAt?: string;
  identity?: Identity;
  stats?: UserStats;
};
