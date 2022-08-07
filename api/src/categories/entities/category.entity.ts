import { Entity, ManyToOne, Property } from '@mikro-orm/core';

import { BaseEntity } from 'src/__shared__/entity/baseEntity.entity';

@Entity()
export class Category extends BaseEntity {
  @Property({
    unique: true,
    type: 'varchar',
    length: 500,
    check: 'length(name) >= 5',
  })
  name!: string;

  @Property({ type: 'jsonb', lazy: true })
  specifications!: any;

  @ManyToOne(() => Category, {
    name: 'category_id',
    lazy: true,
    nullable: true,
  })
  category?: Category;

  // constructor(category?: Partial<Category>) {
  //   Object.assign(this, category);
  // }
}
