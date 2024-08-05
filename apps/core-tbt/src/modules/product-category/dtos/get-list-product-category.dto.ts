import { plainToClass, Transform, Type } from 'class-transformer';
import {
  IsNumber,
  IsOptional,
  IsString,
  ValidateNested,
  IsEnum,
} from 'class-validator';

import { SortDirection, sortDirection } from '@libs/core-shared/constants';

export class SortDto {
  @IsOptional()
  @IsEnum(sortDirection)
  createdAt?: SortDirection;
}

export class GetListProductCategoryDto {
  @IsOptional()
  @IsNumber()
  page?: number;

  @IsOptional()
  @IsNumber()
  size?: number;

  @IsOptional()
  @ValidateNested()
  @Type(() => SortDto)
  @Transform(({ value }) => {
    const sortFields = value.split(',');
    const sortObj: SortDto = {};
    sortFields.forEach((field: string) => {
      const [column, order] = field.split(':');
      sortObj[column] = order as SortDirection;
    });
    return plainToClass(SortDto, sortObj);
  })
  sort?: SortDto;

  @IsOptional()
  @IsString()
  search?: string;
}
