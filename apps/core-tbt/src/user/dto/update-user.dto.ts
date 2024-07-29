import { IsNotEmpty, IsString, MaxLength, MinLength } from 'class-validator';

export class UpdateUserDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  @MaxLength(32)
  username: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(6)
  @MaxLength(32)
  password: string;
}
