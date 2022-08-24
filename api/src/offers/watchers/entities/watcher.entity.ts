import { Entity, ManyToOne } from '@mikro-orm/core';

import { Offer } from 'src/offers/offers/entities/offer.entity';
import { User } from 'src/users/users/entities/user.entity';

@Entity({ tableName: 'offer_watcher' })
export class Watcher {
  @ManyToOne(() => User, { primary: true })
  user: User;

  @ManyToOne(() => Offer, { primary: true })
  offer: Offer;

  constructor(watcher?: Partial<Watcher>) {
    Object.assign(this, watcher);
  }
}
