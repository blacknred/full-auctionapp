import {
  ArrayType,
  Entity,
  Enum,
  Index,
  ManyToOne,
  PrimaryKey,
  Property,
} from '@mikro-orm/core';
import { v4 } from 'uuid';

import { Category } from 'src/categories/entities/category.entity';
import { Profile } from 'src/users/entities/profile.entity';
import { BaseEntity } from 'src/__shared__/entity/baseEntity.entity';
import { OfferStatus, OfferType } from '../types/offer.type';

@Entity({ tableName: 'offer_2022' })
export class Offer extends BaseEntity {
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
  specifications!: any;

  @Index({ name: 'offer_author_id_idx' })
  @ManyToOne(() => Profile, { name: 'author_id' })
  author!: Profile;

  @Index({ name: 'offer_category_id_idx' })
  @ManyToOne(() => Category, { name: 'category_id', nullable: true })
  category?: Category;

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

  @Property({ type: 'jsonb', lazy: true })
  bids!: any;

  //   @BeforeCreate()
  //   async hashPassword() {
  //     this.password = await bcrypt.hash(this.password, 8);
  //   }

  // constructor(offer?: Partial<Offer>) {
  //   Object.assign(this, offer);
  // }
}

// { populate: ['bids', 'specifications', 'description'] }
