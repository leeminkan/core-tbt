import { IsNotEmpty, IsString, MaxLength, MinLength } from 'class-validator';

export class UpdateProductCategoryDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(1)
  @MaxLength(256)
  name: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(1)
  @MaxLength(5000)
  description: string;
}
