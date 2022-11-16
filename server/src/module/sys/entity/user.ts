import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { CommonBase } from './base';
@Entity()
export class User extends CommonBase {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    name: 'name',
    type: 'varchar',
    length: 13,
    comment: '用户昵称',
  })
  name: string;

  @Column({
    name: 'name',
    unique: true,
    type: 'varchar',
    length: 13,
    comment: '用户昵称',
  })
  username: string;

  @Column({
    type: 'varchar',
    length: 40,
    nullable: true,
    comment: '用户密码',
  })
  password: string;
}
