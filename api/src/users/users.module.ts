import { Module } from '@nestjs/common';

import { NotificationsModule } from './notifications/notifications.module';
import { UsersModule as BaseModule } from './users/users.module';

@Module({
  imports: [BaseModule, NotificationsModule],
})
export class UsersModule {}
