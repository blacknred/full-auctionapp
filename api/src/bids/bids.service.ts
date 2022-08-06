import { EntityRepository } from '@mikro-orm/core';
import { InjectRepository } from '@mikro-orm/nestjs';
import { Injectable, Logger } from '@nestjs/common';

import { Offer } from 'src/offers/entities/offer.entity';

@Injectable()
export class BidsService {
  private readonly logger = new Logger(BidsService.name);

  constructor(
    @InjectRepository(Offer)
    private offerRepository: EntityRepository<Offer>,
  ) {}

  // async create({ uid }: CreateBlockDto) {
  //   const cache = this.redisService.getClient('users');

  //   if (!(await cache.exists(`USER:${uid}`))) {
  //     throw new ConflictException({
  //       errors: [{ field: 'uid', message: 'User not exists' }],
  //     });
  //   }

  //   if (!(await cache.exists(`BLOCKLIST:${uid}`))) {
  //     throw new ConflictException({
  //       errors: [{ field: 'uid', message: 'User already in blocklist' }],
  //     });
  //   }

  //   await cache.zadd(`BLOCKLIST:${uid}`, uid, Date.now());

  //   return { data: {} };
  // }

  // async findAll(auid: number, { limit, createdAt, order }: GetBlocksDto) {
  //   const pipe = this.redisService.getClient('users').pipeline();
  //   const args = ['LIMIT', '0', `${limit + 1}`] as const;
  //   const name = `BLOCKLIST:${auid}`;

  //   pipe.zcard(name);

  //   if (order === 'DESC') {
  //     pipe.zrevrangebyscore(name, `(${createdAt}`, '-inf', ...args);
  //   } else {
  //     pipe.zrangebyscore(name, `(${createdAt}`, '+inf', ...args);
  //   }

  //   const [total, ...uids] = await pipe.exec();
  //   const items = await Promise.allSettled(uids.map(([, uid]) => {}));

  //   return {
  //     data: {
  //       total: total[1],
  //       items: items.slice(0, limit),
  //       hasMore: items.length === limit + 1,
  //     },
  //   };
  // }

  // async remove(uid: number) {
  //   const cache = this.redisService.getClient('users');

  //   if (!(await cache.exists(`BLOCKLIST:${uid}`))) {
  //     throw new NotFoundException({
  //       errors: [{ field: 'uid', message: 'User already in BLOCKLIST' }],
  //     });
  //   }

  //   await cache.zrem(`BLOCKLIST:${uid}`, uid);

  //   return { data: null };
  // }
}
