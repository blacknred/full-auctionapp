import { Entity, ManyToOne, Property } from '@mikro-orm/core';

import { Offer } from 'src/offers/offers/entities/offer.entity';
import { User } from 'src/users/users/entities/user.entity';

@Entity({ tableName: 'offer_bid' })
export class Bid {
  @ManyToOne(() => User, { primary: true })
  user: User;

  @ManyToOne(() => Offer, { primary: true })
  offer: Offer;

  @Property({ type: 'numeric(15, 4)', default: 0 })
  price!: number;

  @Property({ lazy: true })
  comment?: string;

  @Property({ defaultRaw: 'now()' })
  createdAt: Date = new Date();

  constructor(bid?: Partial<Bid>) {
    Object.assign(this, bid);
  }
}
