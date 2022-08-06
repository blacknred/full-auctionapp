import type { Options } from '@mikro-orm/core';
import { EntityCaseNamingStrategy } from '@mikro-orm/core';
import { ConfigService } from '@nestjs/config';

import { User } from 'src/users/entities/user.entity';

// initialize the ConfigService manually since it is not a part of a NestJS app
const configService = new ConfigService();

const MikroOrmConfig: Options = {
  clientUrl: configService.get('POSTGRES_URL'),
  entities: [User],
  type: 'postgresql',
  namingStrategy: EntityCaseNamingStrategy,
};

export default MikroOrmConfig;
