import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { Favorite } from './entities/favorite.entity';
import { FavoritesService } from './favorites.service';

@Module({
  imports: [ConfigModule, MikroOrmModule.forFeature([Favorite])],
  controllers: [FavoritesService],
  providers: [FavoritesService],
})
export class FavoritesModule {}
