import { Entity, ManyToOne, Property } from '@mikro-orm/core';

import { Offer } from 'src/offers/entities/offer.entity';
import { Profile } from 'src/users/entities/profile.entity';

@Entity({ tableName: 'offer_bid' })
export class Bid {
  @ManyToOne(() => Profile, { primary: true })
  user: Profile;

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
