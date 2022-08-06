import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { ObserversController } from './observers.controller';
import { ObserversService } from './observers.service';

@Module({
  imports: [ConfigModule],
  controllers: [ObserversController],
  providers: [ObserversService],
})
export class ObserversModule {}
