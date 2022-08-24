import { EntityRepository } from '@mikro-orm/core';
import { InjectRepository } from '@mikro-orm/nestjs';
import { Injectable, Logger } from '@nestjs/common';

import { Watcher } from './entities/watcher.entity';

@Injectable()
export class WatchersService {
  private readonly logger = new Logger(WatchersService.name);

  constructor(
    @InjectRepository(Watcher)
    private watcherRepository: EntityRepository<Watcher>,
  ) {}
}
