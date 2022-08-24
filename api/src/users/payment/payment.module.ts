import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { OffersModule } from 'src/offers/offers/offers.module';
import { UsersModule } from '../users/users.module';

import { PaymentController } from './payment.controller';
import { PaymentService } from './payment.service';

@Module({
  imports: [ConfigModule, UsersModule, OffersModule],
  controllers: [PaymentController],
  providers: [PaymentService],
})
export class PaymentModule {}
