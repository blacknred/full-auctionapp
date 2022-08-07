import { Entity, ManyToOne } from '@mikro-orm/core';

import { Offer } from 'src/offers/entities/offer.entity';
import { User } from 'src/users/entities/user.entity';

@Entity({ tableName: 'order_observer' })
export class Observer {
  @ManyToOne(() => User, { name: 'user_id', lazy: true })
  userId: number;

  @ManyToOne(() => Offer, { name: 'offer_id', lazy: true })
  offerId: string;

  // constructor(observer?: Partial<Observer>) {
  //   Object.assign(this, observer);
  // }
}
