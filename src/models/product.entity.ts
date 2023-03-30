import { Entity, Column, OneToMany, ManyToOne, JoinColumn } from 'typeorm';
import { BaseEntity } from './base.entity';
import { Exclude, Expose, instanceToPlain } from 'class-transformer';
import { Comment } from './comment.entity';
import { Image } from './image.entity';
import { Category } from './category.entity';

@Entity()
export class Product extends BaseEntity {
  @Column({ type: 'varchar', nullable: false })
  @Expose()
  name: string;

  @Column({ type: 'decimal', nullable: false, default: 0 })
  @Expose()
  price: number;

  @Column({ type: 'varchar', nullable: true })
  @Expose()
  type: string;

  @Column({ type: 'varchar', nullable: true })
  @Expose()
  origin: string;

  @Column({ type: 'varchar', nullable: false })
  @Expose()
  description: string;

  @Column({ type: 'decimal', nullable: false })
  @Expose()
  nicotine: number;

  @Column({ type: 'decimal', nullable: false })
  @Expose()
  volume: number;

  @Column({ type: 'int', nullable: false })
  @Expose()
  quantity: number;

  @OneToMany(() => Comment, (comment) => comment.product, { cascade: true })
  @Expose()
  comment: Comment[];

  @OneToMany(() => Image, (image) => image.product, { cascade: true })
  @Expose()
  image: Image[];

  @ManyToOne(() => Category, { nullable: false })
  @JoinColumn({ name: 'category_id' })
  @Expose()
  category: Category;

  @Column({ type: 'bigint', name: 'category_id' })
  @Exclude({ toPlainOnly: true })
  categoryId: number;

  toJSON() {
    return instanceToPlain(this);
  }
}
