import type { Offer } from 'src/offers/offers/types/offer.type';
import type { Profile } from 'src/users/users/types/profile.type';

export type Observer = {
  user: Profile;
  offer: Offer;
};
