import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from 'typeorm';

@Entity()
export class Report {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column('text')
  input: string;

  @Column('text')
  aiSummary: string;

  @CreateDateColumn()
  createdAt: Date;
}
