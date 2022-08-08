import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { Offer } from 'src/offers/offers/entities/offer.entity';
import { BidsController } from './bids.controller';
import { BidsService } from './bids.service';

@Module({
  imports: [ConfigModule, MikroOrmModule.forFeature([Offer])],
  controllers: [BidsController],
  providers: [BidsService],
})
export class BidsModule {}
