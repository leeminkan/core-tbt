import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
  UseGuards,
  Query,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

import { parsePagination } from '@libs/core-shared';

import { ProductCategoryCommandService } from './commands/product-category-command.service';
import { ProductCategoryQueryService } from './queries/product-category-query.service';
import {
  CreateProductCategoryDto,
  UpdateProductCategoryDto,
  GetListProductCategoryDto,
  BulkDeleteProductCategoryDto,
} from './dtos';

@Controller({
  path: 'product',
  version: '1',
})
@UseGuards(AuthGuard('jwt'))
export class ProductCategoryController {
  constructor(
    private readonly productCommandService: ProductCategoryCommandService,
    private readonly productQueryService: ProductCategoryQueryService,
  ) {}

  @Post()
  create(@Body() createProductCategoryDto: CreateProductCategoryDto) {
    return this.productCommandService.create(createProductCategoryDto);
  }

  @Get()
  findAllAndCount(
    @Query() { page = 1, size = 20, ...rest }: GetListProductCategoryDto,
  ) {
    const { take, skip } = parsePagination(page, size);
    return this.productQueryService.findAllAndCount({
      take,
      skip,
      ...rest,
    });
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.productQueryService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateProductCategoryDto: UpdateProductCategoryDto,
  ) {
    return this.productCommandService.update(id, updateProductCategoryDto);
  }

  @Delete()
  bulkRemove(@Body() { ids }: BulkDeleteProductCategoryDto) {
    return this.productCommandService.deleteByIds(ids);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.productCommandService.deleteById(id);
  }
}
