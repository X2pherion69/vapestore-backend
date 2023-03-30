import { AfterInsert, AfterLoad, BeforeInsert, BeforeUpdate, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';

@Entity()
export class BaseEntity {
  @ApiProperty({ description: 'Id' })
  @PrimaryGeneratedColumn('increment')
  @Expose()
  id: number;

  @ApiProperty({ description: 'Created at' })
  @Column({ nullable: false, name: 'created_at' })
  @Expose()
  createdAt: Date;

  @ApiProperty({ description: 'Updated at' })
  @Column({ nullable: false, name: 'updated_at' })
  @Expose()
  updatedAt: Date;

  @ApiProperty({ description: 'Is deleted' })
  @Column({ default: false, name: 'is_deleted' })
  @Expose()
  isDeleted: boolean;

  @BeforeInsert()
  beforeInsert() {
    const date = new Date();
    this.createdAt = date;
    this.updatedAt = date;
  }

  @BeforeUpdate()
  beforeUpdate() {
    if (this) this.updatedAt = new Date();
  }

  @AfterLoad()
  afterLoad() {
    if (this) this.id = parseInt(this.id.toString());
  }

  @AfterInsert()
  afterInsert() {
    if (this) this.id = parseInt(this.id.toString());
  }
}
