import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { Observer } from './entities/observer.entity';
import { ObserversController } from './observers.controller';
import { ObserversService } from './observers.service';

@Module({
  imports: [ConfigModule, MikroOrmModule.forFeature([Observer])],
  controllers: [ObserversController],
  providers: [ObserversService],
})
export class ObserversModule {}
