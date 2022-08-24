import type { Offer } from 'src/offers/offers/types/offer.type';
import type { User } from 'src/users/users/types/user.type';

export type Watcher = {
  user: User;
  offer: Offer;
};
