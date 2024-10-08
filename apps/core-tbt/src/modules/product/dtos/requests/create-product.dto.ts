import {
  IsArray,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

export class CreateProductDto {
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

  @IsString()
  @IsNotEmpty()
  @MinLength(1)
  @MaxLength(256)
  image: string;

  @IsNotEmpty()
  @IsNumber()
  price: number;

  @IsOptional()
  @IsArray()
  @IsNumber({}, { each: true })
  categoryIds: number[];
}
