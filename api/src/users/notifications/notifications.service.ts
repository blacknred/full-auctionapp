import { EntityRepository } from '@mikro-orm/core';
import { InjectRepository } from '@mikro-orm/nestjs';
import { Injectable, Logger } from '@nestjs/common';

import { Notification } from './entities/notification.entity';
import { Timeline } from './entities/timeline.entity';

@Injectable()
export class NotificationsService {
  private readonly logger = new Logger(NotificationsService.name);

  constructor(
    @InjectRepository(Timeline)
    private timelineRepository: EntityRepository<Timeline>,
    private notificationsRepository: EntityRepository<Notification>,
  ) {}
}
