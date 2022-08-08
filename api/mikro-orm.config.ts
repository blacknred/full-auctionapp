import type { Options } from '@mikro-orm/core';
import { EntityCaseNamingStrategy } from '@mikro-orm/core';
import { ConfigService } from '@nestjs/config';

import { Category } from 'src/offers/categories/entities/category.entity';
import { Observer } from 'src/offers/observers/entities/observer.entity';
import { Offer } from 'src/offers/offers/entities/offer.entity';
import { Profile } from 'src/users/users/entities/profile.entity';
import { User } from 'src/users/users/entities/user.entity';

// initialize the ConfigService manually since it is not a part of a NestJS app
const configService = new ConfigService();

const MikroOrmConfig: Options = {
  namingStrategy: EntityCaseNamingStrategy,
  clientUrl: configService.get('POSTGRES_URL'),
  entities: [User, Profile, Category, Offer, Observer],
  type: 'postgresql',
};

export default MikroOrmConfig;
