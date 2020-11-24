import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

import bcrypt from 'bcryptjs';

@Entity()
export class User {
  @PrimaryGeneratedColumn() id: number;

  @Column() firstname: string;

  @Column() lastname: string;

  @Column() username: string;

  @Column() email: string;

  @Column({ type: 'text' }) password: string;

  async encryptPassword(password: string): Promise<string> {
    const salt = await bcrypt.genSalt(10);
    return bcrypt.hash(password, salt);
  }

  async validatePassword(password: string): Promise<boolean> {
    return await bcrypt.compare(password, this.password);
  }
}
