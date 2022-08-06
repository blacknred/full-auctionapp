import * as Joi from '@hapi/joi';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Logger, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AmqpModule } from 'nestjs-amqp';
import { RedisModule } from 'nestjs-redis';

import { AuthModule } from './auth/auth.module';
import { BidsModule } from './bids/bids.module';
import { CategoriesModule } from './categories/categories.module';
import { MonitoringModule } from './monitoring/monitoring.module';
import { NotificationsModule } from './notifications/notifications.module';
import { ObserversModule } from './observers/observers.module';
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
        CLIENT_ORIGIN: Joi.string().required(),
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
    CategoriesModule,
    OffersModule,
    BidsModule,
    ObserversModule,
    NotificationsModule,
    AuthModule,
    MonitoringModule,
  ],
  providers: [Logger],
})
export class AppModule {}
