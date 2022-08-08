import type { Profile } from '../../../users/users/types/profile.type';

export type Bid = {
  user: Profile;
  price: number;
  comment?: string;
  createdAt: string;
};
