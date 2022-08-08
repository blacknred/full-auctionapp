import type { User } from '../../../users/users/types/user.type';

export type Bid = {
  user: User;
  price: number;
  comment?: string;
  createdAt: string;
};
