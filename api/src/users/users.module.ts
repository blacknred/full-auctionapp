import { Module } from '@nestjs/common';

import { NotificationsModule } from './notifications/notifications.module';
import { PaymentModule } from './payment/payment.module';
import { UsersModule as BaseModule } from './users/users.module';

@Module({
  imports: [BaseModule, NotificationsModule, PaymentModule],
})
export class UsersModule {}
