import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Student } from './student.entity';

@Entity()
export class Course {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: String;

  @ManyToMany((type) => Student, (student) => Student.courses)
  students: Student[];
}
