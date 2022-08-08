import {
  BeforeCreate,
  Entity,
  Enum,
  OneToOne,
  Property,
} from '@mikro-orm/core';
import * as bcrypt from 'bcryptjs';

import { Notification } from 'src/users/notifications/entities/notification.entity';
import { BaseEntity } from 'src/__shared__/entity/baseEntity.entity';
import { NotificationMethod } from '../types/user.type';
import { Profile } from './profile.entity';

@Entity({ tableName: 'user' })
export class User extends BaseEntity<User> {
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
  notifications: Notification[] = [];
  // const repo = em.getRepository(Notification);
  // const notifications = raws.map(user => repo.map(Notification));

  @OneToOne({
    entity: () => Profile,
    mappedBy: 'user',
  })
  profile: Profile;

  @BeforeCreate()
  async hashPassword() {
    this.password = await bcrypt.hash(this.password, 8);
  }

  constructor(user?: Partial<User>) {
    super();
    Object.assign(this, user);
  }
}
