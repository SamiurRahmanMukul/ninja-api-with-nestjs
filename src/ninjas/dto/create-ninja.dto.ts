import { IsEnum, MinLength } from 'class-validator';

export class CreateNinjaDto {
  id: number;
  @MinLength(3)
  name: string;
  @IsEnum(['stars', 'nunjucks'], {
    message: 'Weapon must be stars or nunjucks',
  })
  weapon: string;
}
