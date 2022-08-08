import { EntityRepository } from '@mikro-orm/core';
import { InjectRepository } from '@mikro-orm/nestjs';
import { Injectable, Logger } from '@nestjs/common';

import { Bid } from './entities/bid.entity';

@Injectable()
export class BidsService {
  private readonly logger = new Logger(BidsService.name);

  constructor(
    @InjectRepository(Bid)
    private offerRepository: EntityRepository<Bid>,
  ) {}
}
