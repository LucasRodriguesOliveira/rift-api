import { Expose } from 'class-transformer';
import { IsString, MaxLength, MinLength } from 'class-validator';

export class CreateUserTypeDto {
  @IsString()
  @MaxLength(30)
  @MinLength(3)
  @Expose()
  description: string;
}
