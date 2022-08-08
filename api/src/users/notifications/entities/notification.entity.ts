import { Embeddable, ManyToOne, Property } from '@mikro-orm/core';

import { Offer } from 'src/offers/offers/entities/offer.entity';

@Embeddable()
export class Notification {
  @Property()
  body: string;

  @Property()
  createdAt: Date = new Date();

  @ManyToOne(() => Offer, { lazy: true, nullable: true })
  offer?: Offer;

  constructor(notification?: Partial<Notification>) {
    Object.assign(this, notification);
  }
}

// const repo = em.getRepository(Notification);
// const notifications = raws.map(notification => repo.map(notification)); // raw to entity
// SELECT jsonb_path_query_array(notifications, '$[30 to 60]') FROM timeline WHERE user_id=1; // pagination
// UPDATE timeline SET notifications = '{"body":"You won!", "createdAt":'2022-10-14 13:55:16.622111', "offerId":'1c52a84f-3f23-4335-a5df-ea198637e634'}'::jsonb || notifications WHERE user_id=1; // add in the start
// UPDATE timeline SET notifications = notifications - 6 WHERE user_id=1; // delete in 6 index
// UPDATE timeline SET notifications = (SELECT jsonb_path_query_array(notifications, '$[0 to 1000]') FROM timeline  WHERE user_id=1) WHERE user_id=1; // splice to 1000
