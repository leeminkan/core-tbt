import { ArrayMaxSize, IsArray, IsNotEmpty, IsNumber } from 'class-validator';

export class BulkDeleteProductCategoryDto {
  @IsNotEmpty()
  @IsArray()
  @ArrayMaxSize(2)
  @IsNumber({}, { each: true })
  ids: number[];
}
