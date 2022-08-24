import { Module } from '@nestjs/common';

import { BidsModule } from './bids/bids.module';
import { CategoriesModule } from './categories/categories.module';
import { WatchersModule } from './watchers/watchers.module';
import { OffersModule as BaseModule } from './offers/offers.module';

@Module({
  imports: [CategoriesModule, BaseModule, BidsModule, WatchersModule],
})
export class OffersModule {}
