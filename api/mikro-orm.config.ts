import type { Options } from '@mikro-orm/core';
import { EntityCaseNamingStrategy } from '@mikro-orm/core';
import { ConfigService } from '@nestjs/config';

import { Report } from 'src/users/_reports/entities/report.entity';

// initialize the ConfigService manually since it is not a part of a NestJS app
const configService = new ConfigService();

const MikroOrmConfig: Options = {
  clientUrl: configService.get('POSTGRES_URL'),
  entities: [Report],
  type: 'postgresql',
  namingStrategy: EntityCaseNamingStrategy,
};

export default MikroOrmConfig;
