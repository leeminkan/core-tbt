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

export class GetListProductDto {
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

  @IsOptional()
  @IsString()
  search?: string;

  @IsOptional()
  @IsNumber()
  fromPrice?: number;

  @IsOptional()
  @IsNumber()
  toPrice?: number;
}
