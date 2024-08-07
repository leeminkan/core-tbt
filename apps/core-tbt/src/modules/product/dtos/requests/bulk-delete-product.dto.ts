import { ArrayMaxSize, IsArray, IsNotEmpty, IsNumber } from 'class-validator';

export class BulkDeleteProductDto {
  @IsNotEmpty()
  @IsArray()
  @ArrayMaxSize(2)
  @IsNumber({}, { each: true })
  ids: number[];
}
