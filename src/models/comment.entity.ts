import { Column, JoinColumn, ManyToOne, Entity } from 'typeorm';
import { BaseEntity } from './base.entity';
import { Exclude, Expose, instanceToPlain } from 'class-transformer';
import { Product } from './product.entity';

@Entity()
export class Comment extends BaseEntity {
  @Column({ type: 'varchar', nullable: false })
  @Expose()
  username: string;

  @Column({ type: 'varchar', nullable: false })
  @Expose()
  comment: string;

  @ManyToOne(() => Product, { nullable: true })
  @JoinColumn({ name: 'product_id' })
  @Expose()
  product: Product;

  @Column({ type: 'bigint', name: 'product_id' })
  @Exclude({ toPlainOnly: true })
  productId: number;

  toJSON() {
    return instanceToPlain(this);
  }
}
