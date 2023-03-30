import { Column, Entity, OneToMany } from 'typeorm';
import { BaseEntity } from './base.entity';
import { Expose } from 'class-transformer';
import { Product } from './product.entity';

@Entity()
export class Category extends BaseEntity {
  @Column({ type: 'varchar', nullable: false })
  @Expose()
  name: string;

  @OneToMany(() => Product, (product) => product.category, { cascade: true })
  @Expose()
  product: Product[];
}
