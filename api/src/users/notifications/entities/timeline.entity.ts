import { Embedded, Entity, Index, OneToOne } from '@mikro-orm/core';

import { User } from 'src/users/users/entities/user.entity';
import { Notification } from './notification.entity';

@Entity({ tableName: 'timeline' })
export class Timeline {
  @Embedded(() => Notification, { array: true, object: true })
  notifications: Notification[] = [];

  @Index({ name: 'notification_user_id_idx' })
  @OneToOne()
  user: User;
}
