import {
  BaseEntity as Base,
  Index,
  PrimaryKey,
  Property,
} from '@mikro-orm/core';

export abstract class BaseEntity<T extends { id: unknown }> extends Base<
  T,
  'id'
> {
  @PrimaryKey()
  id: unknown;

  @Property()
  @Index()
  createdAt: Date = new Date();

  @Property({ onUpdate: () => new Date(), lazy: true })
  updatedAt: Date = new Date();
}
