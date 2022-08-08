import { Module } from '@nestjs/common';

import { BidsModule } from './bids/bids.module';
import { CategoriesModule } from './categories/categories.module';
import { FavoritesModule } from './favorites/favorites.module';
import { OffersModule as BaseModule } from './offers/offers.module';

@Module({
  imports: [CategoriesModule, BaseModule, BidsModule, FavoritesModule],
})
export class OffersModule {}
