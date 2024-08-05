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

import { ProductCommandService } from './commands/product-command.service';
import { ProductQueryService } from './queries/product-query.service';
import {
  CreateProductDto,
  UpdateProductDto,
  GetListProductDto,
  BulkDeleteProductDto,
} from './dtos';

@Controller({
  path: 'product',
  version: '1',
})
@UseGuards(AuthGuard('jwt'))
export class ProductController {
  constructor(
    private readonly productCommandService: ProductCommandService,
    private readonly productQueryService: ProductQueryService,
  ) {}

  @Post()
  create(@Body() createProductDto: CreateProductDto) {
    return this.productCommandService.create(createProductDto);
  }

  @Get()
  findAllAndCount(
    @Query() { page = 1, size = 20, ...rest }: GetListProductDto,
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
    @Body() updateProductDto: UpdateProductDto,
  ) {
    return this.productCommandService.update(id, updateProductDto);
  }

  @Delete()
  bulkRemove(@Body() { ids }: BulkDeleteProductDto) {
    return this.productCommandService.deleteByIds(ids);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.productCommandService.deleteById(id);
  }
}
