import { Entity, ManyToOne, Property } from '@mikro-orm/core';

import { BaseEntity } from 'src/__shared__/entity/baseEntity.entity';
import type { CategorySpecifications } from '../types/category.type';

@Entity({ tableName: 'offer_category' })
export class Category extends BaseEntity<Category> {
  @Property({
    unique: true,
    length: 500,
    check: 'length(name) >= 5',
  })
  name!: string;

  @Property({ type: 'jsonb', lazy: true })
  specifications!: CategorySpecifications;

  @ManyToOne(() => Category, { nullable: true })
  category?: Category;

  constructor(category?: Partial<Category>) {
    super();
    Object.assign(this, category);
  }
}
