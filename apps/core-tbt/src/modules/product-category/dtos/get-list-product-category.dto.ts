import { plainToClass, Transform, Type } from 'class-transformer';
import {
  IsNumber,
  IsOptional,
  IsString,
  ValidateNested,
  IsEnum,
  IsBoolean,
} from 'class-validator';

import { SortDirection, sortDirection } from '@libs/core-shared/constants';

export class SortDto {
  @IsOptional()
  @IsEnum(sortDirection)
  createdAt?: SortDirection;

  @IsOptional()
  @IsEnum(sortDirection)
  name?: SortDirection;
}

export class GetListProductCategoryDto {
  @IsOptional()
  @IsString()
  search?: string;

  @IsOptional()
  @IsBoolean()
  root?: boolean;

  @IsOptional()
  @IsNumber()
  parentId?: number;

  @IsOptional()
  @IsNumber()
  page?: number;

  @IsOptional()
  @IsNumber()
  pageSize?: number;

  @IsOptional()
  @ValidateNested()
  @Type(() => SortDto)
  @Transform(({ value }) => {
    const sortFields = value.split(',');
    const sortObj: Record<string, string> = {};
    sortFields.forEach((field: string) => {
      const [column, order] = field.split(':');
      sortObj[column] = order;
    });
    return plainToClass(SortDto, sortObj);
  })
  sort?: SortDto;
}
