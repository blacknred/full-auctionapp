import { User } from 'src/users/types/user.type';

export type Auth = Pick<User, 'id' | 'is_admin'>;
