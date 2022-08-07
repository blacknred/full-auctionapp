import {
  BaseEntity as Base,
  Index,
  PrimaryKey,
  Property,
} from '@mikro-orm/core';

export abstract class BaseEntity extends Base<BaseEntity, 'id'> {
  @PrimaryKey()
  id: number;

  @Property()
  @Index()
  createdAt: Date = new Date();

  @Property({ onUpdate: () => new Date(), lazy: true })
  updatedAt: Date = new Date();
}
