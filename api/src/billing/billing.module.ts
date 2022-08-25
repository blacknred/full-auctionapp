import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { OffersModule } from 'src/offers/offers/offers.module';
import { UsersModule } from '../users/users/users.module';

import { BillingController } from './billing.controller';
import { BillingService } from './billing.service';

@Module({
  imports: [ConfigModule, UsersModule, OffersModule],
  controllers: [BillingController],
  providers: [BillingService],
})
export class BillingModule {}
