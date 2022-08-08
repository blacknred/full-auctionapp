import { Entity, ManyToOne } from '@mikro-orm/core';

import { Offer } from 'src/offers/offers/entities/offer.entity';
import { User } from 'src/users/users/entities/user.entity';

@Entity({ tableName: 'order_observer' })
export class Observer {
  @ManyToOne(() => User, { primary: true })
  user: User;

  @ManyToOne(() => Offer, { primary: true })
  offer: Offer;

  constructor(observer?: Partial<Observer>) {
    Object.assign(this, observer);
  }
}
