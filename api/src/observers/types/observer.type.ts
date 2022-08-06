import { Offer } from 'src/offers/types/offer.type';
import { Profile } from 'src/users/types/profile.type';

export type Observer = {
  user: Profile;
  offer: Offer;
};
