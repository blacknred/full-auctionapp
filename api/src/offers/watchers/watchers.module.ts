import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { Watcher } from './entities/watcher.entity';
import { WatchersController } from './watchers.controller';
import { WatchersService } from './watchers.service';

@Module({
  imports: [ConfigModule, MikroOrmModule.forFeature([Watcher])],
  controllers: [WatchersController],
  providers: [WatchersService],
})
export class WatchersModule {}
