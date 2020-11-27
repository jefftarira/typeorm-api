import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { User } from './User';

@Entity()
export class Photo {
  @PrimaryGeneratedColumn()
  id: number;

  @Column() title: string;

  @Column({ type: 'text' }) description: string;

  @Column({ type: 'text' })
  url: string;

  @ManyToOne((type) => User, { nullable: false })
  @JoinColumn({ referencedColumnName: 'id' })
  user: User;
}
