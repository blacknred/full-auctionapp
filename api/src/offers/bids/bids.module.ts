import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { BidsController } from './bids.controller';
import { BidsService } from './bids.service';
import { Bid } from './entities/bid.entity';

@Module({
  imports: [ConfigModule, MikroOrmModule.forFeature([Bid])],
  controllers: [BidsController],
  providers: [BidsService],
})
export class BidsModule {}
