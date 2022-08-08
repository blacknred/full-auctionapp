import { Entity, Index, OneToOne, Property } from '@mikro-orm/core';

import { User } from './user.entity';

@Entity({ tableName: 'profile' })
export class Profile {
  @Property({ unique: true, length: 100, check: 'length(username) >= 5' })
  username!: string;

  @Property({
    length: 500,
    lazy: true,
    nullable: true,
    check: 'length(bio) > 0',
  })
  bio?: string;

  @Property({ nullable: true })
  image?: string;

  @Property({ type: 'smallint' })
  rating = 0;

  @Index({ name: 'profile_user_id_idx' })
  @OneToOne()
  user: User;

  constructor(profile?: Partial<Profile>) {
    Object.assign(this, profile);
  }
}
