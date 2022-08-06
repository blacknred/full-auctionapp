import { Module } from '@nestjs/common';

import { BidsModule } from './bids/bids.module';
import { CategoriesModule } from './categories/categories.module';
import { ObserversModule } from './observers/observers.module';
import { OffersModule as BaseModule } from './offers/offers.module';

@Module({
  imports: [BaseModule, BidsModule, ObserversModule, CategoriesModule],
})
export class OffersModule {}
