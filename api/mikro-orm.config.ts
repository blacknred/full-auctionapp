import type { Options } from '@mikro-orm/core';
import { EntityCaseNamingStrategy } from '@mikro-orm/core';
import { ConfigService } from '@nestjs/config';

import { Bid } from 'src/offers/bids/entities/bid.entity';
import { Category } from 'src/offers/categories/entities/category.entity';
import { Observer } from 'src/offers/observers/entities/observer.entity';
import { Offer } from 'src/offers/offers/entities/offer.entity';
import {
  Notification,
  Notifications,
} from 'src/users/notifications/entities/notification.entity';
import { Identity } from 'src/users/users/entities/identity.entity';
import { User } from 'src/users/users/entities/user.entity';

// initialize the ConfigService manually since it is not a part of a NestJS app
const configService = new ConfigService();

const MikroOrmConfig: Options = {
  namingStrategy: EntityCaseNamingStrategy,
  clientUrl: configService.get('POSTGRES_URL'),
  entities: [
    User,
    Identity,
    Notification,
    Notifications,
    Category,
    Offer,
    Observer,
    Bid,
  ],
  type: 'postgresql',
};

export default MikroOrmConfig;
