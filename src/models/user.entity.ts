import { Entity, Column } from 'typeorm';
import { BaseEntity } from './base.entity';
import { Expose } from 'class-transformer';

@Entity()
export class Users extends BaseEntity {
  @Column({ type: 'varchar', nullable: false })
  @Expose()
  name: string;

  @Column({ type: 'varchar', nullable: false })
  @Expose()
  phone: string;

  @Column({ type: 'varchar', nullable: false })
  @Expose()
  email: string;

  @Column({ type: 'varchar', nullable: false })
  @Expose()
  address: string;
}
