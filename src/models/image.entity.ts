import { Exclude, Expose, instanceToPlain } from 'class-transformer';
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { BaseEntity } from './base.entity';
import { Product } from './product.entity';

@Entity()
export class Image extends BaseEntity {
  @Column({ type: 'varchar', nullable: false })
  @Expose()
  name: string;

  @Column({ name: 'image_content', type: 'varchar', nullable: false })
  @Expose()
  imageContent: string;

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
