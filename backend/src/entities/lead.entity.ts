import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from 'typeorm';

@Entity()
export class Lead {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  phone: string;

  @Column({ default: 'whatsapp' })
  channel: string;

  @Column({ nullable: true })
  rawText: string;

  @Column({ type: 'float', default: 0 })
  score: number;

  @CreateDateColumn()
  createdAt: Date;
}
