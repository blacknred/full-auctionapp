import { BaseEntity, Entity, ManyToOne } from '@mikro-orm/core';
import { Offer } from 'src/offers/entities/offer.entity';
import { User } from 'src/users/entities/user.entity';

@Entity({ tableName: 'order_observer' })
export class Observer extends BaseEntity<Observer, null> {
  @ManyToOne(() => User, { name: 'user_id' })
  userId: number;

  @ManyToOne(() => Offer, { name: 'offer_id' })
  offerId: string;

  // constructor(user?: Partial<User>) {
  //   Object.assign(this, user);
  //   this.un = this.un ?? user.username;
  // }
}
