import {
  Body,
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
  Post,
} from '@nestjs/common';
import { Student } from './enteties/student.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateStudentDto } from './dto/create-student.dto/create-student.dto';
import { UpdateStudentDto } from './dto/update-student.dto/update-student.dto';
import { Course } from './enteties/course.entity';

@Injectable()
export class StudentsService {
  constructor(
    @InjectRepository(Student)
    private readonly studentRepository: Repository<Student>,
    @InjectRepository(Course)
    private readonly courseRepository: Repository<Course>,
  ) {}

  async findAll(): Promise<Student[]> {
    return this.studentRepository.find({
      relations: ['courses'],
    });
  }

  async findOne(id: number): Promise<Student> {
    const student = this.studentRepository.findOne({ where: { id } });
    if (!student) {
      throw new HttpException('Student not found', HttpStatus.NOT_FOUND);
    }
    return student;
  }

  async create(createStudentDto: CreateStudentDto) {
    const courses = await Promise.all(
      createStudentDto.courses.map((x) => this.preloadCourseByName(x)),
    );

    const student = this.studentRepository.create({
      ...createStudentDto,
      courses,
    });
    return this.studentRepository.save(student);
  }

  async update(id: number, updateStudentDto: UpdateStudentDto) {
    const courses =
      updateStudentDto.courses &&
      (await Promise.all(
        updateStudentDto.courses.map((x) => this.preloadCourseByName(x)),
      ));
    const updateStudent = await this.studentRepository.preload({
      id: +id,
      ...updateStudentDto,
      courses,
    });
    if (!updateStudent) {
      throw new NotFoundException();
    }
    return this.studentRepository.save(updateStudent);
  }

  async remove(id: number) {
    await this.studentRepository.delete(id);
  }

  private async preloadCourseByName(name: String): Promise<Course> {
    const course = await this.courseRepository.findOne({ where: { name } });
    if (course) {
      return course;
    }
    return this.courseRepository.create({ name });
  }
}
