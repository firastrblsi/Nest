import { Injectable, NotFoundException } from '@nestjs/common';
import { IAuthenticate, Role } from './interface/Role';
import { faker } from '@faker-js/faker';
import { AuthenticateDto } from './dto/authenticate.dto';
import { sign } from 'jsonwebtoken';

@Injectable()
export class AuthService {
  users = [
    {
      id: faker.string.uuid(),
      userName: 'Firas',
      password: '123',
      role: Role.Admin,
    },
    {
      id: faker.string.uuid(),
      userName: 'Ali',
      password: '147',
      role: Role.User,
    },
  ];

  authentificate(authenticateDto: AuthenticateDto): IAuthenticate {
    const user = this.users.find(
      (u) =>
        u.userName === authenticateDto.username &&
        u.password === authenticateDto.password,
    );

    if (!user) throw new NotFoundException('Invalid credentials');

    const token = sign({ ...user }, 'secret');
    return { token, user };
  }
}
