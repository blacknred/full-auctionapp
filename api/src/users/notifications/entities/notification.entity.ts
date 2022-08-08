import {
  Embeddable,
  Embedded,
  Entity,
  Index,
  ManyToOne,
  OneToOne,
  Property,
} from '@mikro-orm/core';

import { Offer } from 'src/offers/offers/entities/offer.entity';
import { User } from 'src/users/users/entities/user.entity';

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

@Entity({ tableName: 'notification' })
export class Notifications {
  @Embedded(() => Notification, { array: true, object: true })
  events: Notification[] = [];

  @Index({ name: 'notification_user_id_idx' })
  @OneToOne()
  user: User;
}

// const repo = em.getRepository(NotificationEvent);
// const notifications = raws.map(event => repo.map(event));
