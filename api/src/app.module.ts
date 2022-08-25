import * as Joi from '@hapi/joi';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Logger, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AmqpModule } from 'nestjs-amqp';
import { RedisModule } from 'nestjs-redis';

import { AuthModule } from './auth/auth.module';
import { BillingModule } from './billing/billing.module';
import { MonitoringModule } from './monitoring/monitoring.module';
import { OffersModule } from './offers/offers.module';
import { UsersModule } from './users/users.module';
import { databaseProvider } from './__shared__/providers/database.provider';
import { queueProvider } from './__shared__/providers/queue.provider';
import { redisProvider } from './__shared__/providers/redis.provider';

@Module({
  imports: [
    ConfigModule.forRoot({
      validationSchema: Joi.object({
        NODE_ENV: Joi.string().required(),
        SECRET: Joi.string().required(),
        POSTGRES_URL: Joi.string().required(),
        REDIS_URL: Joi.string().required(),
        RABBITMQ_URL: Joi.string().required(),
        SMTP_URL: Joi.string().required(),
        TWILIO_ACCOUNT_SID: Joi.string().required(),
        TWILIO_AUTH_TOKEN: Joi.string().required(),
        TWILIO_VERIFICATION_SERVICE_SID: Joi.string().required(),
        TWILIO_SENDER_PHONE_NUMBER: Joi.string().required(),
      }),
    }),
    MikroOrmModule.forRootAsync(databaseProvider),
    RedisModule.forRootAsync(redisProvider),
    AmqpModule.forRootAsync(queueProvider),
    UsersModule,
    OffersModule,
    AuthModule,
    BillingModule,
    MonitoringModule,
  ],
  providers: [Logger],
})
export class AppModule {}
