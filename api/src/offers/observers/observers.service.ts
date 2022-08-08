import { EntityRepository } from '@mikro-orm/core';
import { InjectRepository } from '@mikro-orm/nestjs';
import { Injectable, Logger } from '@nestjs/common';

import { Observer } from './entities/observer.entity';

@Injectable()
export class ObserversService {
  private readonly logger = new Logger(ObserversService.name);

  constructor(
    @InjectRepository(Observer)
    private observerRepository: EntityRepository<Observer>,
  ) {}
}
