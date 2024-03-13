import { Module } from '@nestjs/common';
import { StudentsController } from './students.controller';
import { StudentsService } from './students.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Student } from './enteties/student.entity';
import { Course } from './enteties/course.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Student, Course])],
  controllers: [StudentsController],
  providers: [StudentsService],
})
export class StudentsModule {}
