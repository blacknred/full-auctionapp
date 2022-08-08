import { User } from 'src/users/users/types/identity.type';

export type Auth = Pick<User, 'id' | 'is_admin'>;
