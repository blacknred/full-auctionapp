import { ManyToOne, Property } from '@mikro-orm/core';

import { Offer } from 'src/offers/offers/entities/offer.entity';

export class Notification {
  @Property()
  body: string;

  @Property()
  createdAt: Date = new Date();

  @ManyToOne(() => Offer, { lazy: true })
  offer!: Offer;

  constructor(notification?: Partial<Notification>) {
    Object.assign(this, notification);
  }
}
