import {
  ArrayType,
  Collection,
  Entity,
  Enum,
  Index,
  ManyToMany,
  ManyToOne,
  PrimaryKey,
  Property,
} from '@mikro-orm/core';
import { v4 } from 'uuid';

import { Bid } from 'src/offers/bids/entities/bid.entity';
import { Category } from 'src/offers/categories/entities/category.entity';
import type { CategorySpecifications } from 'src/offers/categories/types/category.type';
import { Observer } from 'src/offers/observers/entities/observer.entity';
import { User } from 'src/users/users/entities/user.entity';
import { BaseEntity } from 'src/__shared__/entity/baseEntity.entity';
import { OfferStatus, OfferType } from '../types/offer.type';

@Entity({ tableName: 'offer' })
export class Offer extends BaseEntity<Offer> {
  @PrimaryKey()
  id = v4() as unknown as number;

  @Property({
    length: 500,
    check: 'length(title) >= 5',
  })
  title!: string;

  @Property({ type: 'text', lazy: true })
  description!: string;

  @Enum({ items: () => OfferType, default: OfferType.SELL })
  type: OfferType = OfferType.SELL;

  @Enum({
    items: () => OfferStatus,
    default: OfferStatus.ACTIVE,
  })
  status: OfferStatus = OfferStatus.ACTIVE;

  @Property({ type: ArrayType, default: [] })
  assets: string[] = [];

  @Property()
  endsAt!: Date;

  @Property({ type: 'jsonb', lazy: true })
  specifications!: CategorySpecifications;

  @Property({ type: 'numeric(15, 4)' })
  startPrice!: number;

  @Property({ type: 'numeric(15, 4)', nullable: true })
  blitzPrice?: number;

  @Property({ type: 'numeric(15, 4)', nullable: true })
  priceStep?: number;

  @Property({ length: 3, check: 'length(currency) == 3' })
  currency!: string;

  @Property()
  isPromoted = false;

  @Property()
  isAnonymous = false;

  @Property()
  isSingleBid = false;

  @Property({ type: 'smallint', nullable: true })
  bidderMinRating?: number;

  @Property()
  viewsCnt = 0;

  @Index({ name: 'offer_author_id_idx' })
  @ManyToOne(() => User)
  author!: User;

  @Index({ name: 'offer_category_id_idx' })
  @ManyToOne(() => Category, { nullable: true })
  category?: Category;

  constructor(offer?: Partial<Offer>) {
    super();
    Object.assign(this, offer);
  }

  //

  @ManyToMany({ entity: () => User, pivotEntity: () => Bid })
  bids = new Collection<Bid>(this);

  @ManyToMany({ entity: () => User, pivotEntity: () => Observer })
  observers = new Collection<User>(this);
}

// { populate: ['specifications', 'description'] }
