import { Entity, ManyToOne } from '@mikro-orm/core';

import { Offer } from 'src/offers/offers/entities/offer.entity';
import { Profile } from 'src/users/users/entities/profile.entity';

@Entity({ tableName: 'order_observer' })
export class Observer {
  @ManyToOne(() => Profile, { primary: true })
  user: Profile;

  @ManyToOne(() => Offer, { primary: true })
  offer: Offer;

  constructor(observer?: Partial<Observer>) {
    Object.assign(this, observer);
  }
}
