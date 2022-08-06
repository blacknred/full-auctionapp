import {
  BaseEntity,
  Entity,
  ManyToOne,
  PrimaryKey,
  Property,
} from '@mikro-orm/core';

@Entity()
export class Category extends BaseEntity<Category, 'id'> {
  @PrimaryKey()
  id: number;

  @Property({ unique: true, type: 'varchar', length: 500 })
  name!: string;

  @Property({ type: 'jsonb' })
  specifications!: any;

  @ManyToOne(() => Category, { name: 'category_id' })
  category?: Category;

  // constructor(user?: Partial<User>) {
  //   Object.assign(this, user);
  //   this.un = this.un ?? user.username;
  // }
}
