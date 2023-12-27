import { MinLength } from 'class-validator';

export class CreateUserDto {
  id: number;

  @MinLength(3)
  firstName: string;

  @MinLength(3)
  lastName: string;

  isActive: boolean;
}
