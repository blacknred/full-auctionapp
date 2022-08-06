import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { BidsController } from './bids.controller';
import { BidsService } from './bids.service';

@Module({
  imports: [ConfigModule],
  controllers: [BidsController],
  providers: [BidsService],
})
export class BidsModule {}
