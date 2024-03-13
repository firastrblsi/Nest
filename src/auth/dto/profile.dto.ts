import { IsNotEmpty, IsString } from 'class-validator';
import { Role } from '../interface/Role';

export class ProfileDto {
  @IsNotEmpty()
  @IsString()
  readonly id: string;
  @IsNotEmpty()
  @IsString()
  userUUID: string;
  @IsNotEmpty()
  @IsString()
  readonly username: string;
  @IsNotEmpty()
  @IsString()
  readonly email: string;
  @IsNotEmpty()
  @IsString()
  readonly password: string;
  @IsNotEmpty()
  @IsString()
  readonly role: Role;
}
