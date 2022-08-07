import { BeforeCreate, Entity, Enum, Property } from '@mikro-orm/core';
import * as bcrypt from 'bcryptjs';

import { BaseEntity } from 'src/__shared__/entity/baseEntity.entity';
import { NotificationMethod } from '../types/user.type';

@Entity()
export class User extends BaseEntity {
  @Property({ unique: true, check: 'length(email) >= 5' })
  email!: string;

  @Property({ hidden: true })
  password!: string;

  @Property({ nullable: true })
  phone?: string;

  @Property()
  isAdmin = false;

  @Property()
  isPremium = false;

  @Property({ length: 3, check: 'length(currency) == 3' })
  currency = 'USD';

  @Property({ length: 5, check: 'length(locale) == 5' })
  locale!: string;

  @Property({ lazy: true, nullable: true })
  deletedAt?: Date;

  @Enum({
    items: () => NotificationMethod,
    default: NotificationMethod.EMAIL,
  })
  notificationMethod: NotificationMethod = NotificationMethod.EMAIL;

  @Property({ type: 'jsonb', lazy: true })
  notifications!: any;

  @BeforeCreate()
  async hashPassword() {
    this.password = await bcrypt.hash(this.password, 8);
  }

  // constructor(user?: Partial<User>) {
  //   Object.assign(this, user);
  // }
}
