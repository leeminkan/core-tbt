import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

import { ProductCategory } from '@libs/core-domain';
import {
  formatGetDetailResponse,
  formatGetListResponse,
  parsePagination,
} from '@libs/core-shared';

import { ProductCategoryCommandService } from './commands/product-category-command.service';
import {
  BulkDeleteProductCategoryDto,
  CreateProductCategoryDto,
  GetListProductCategoryDto,
  UpdateProductCategoryDto,
} from './dtos';
import { ProductCategoryQueryService } from './queries/product-category-query.service';

@Controller({
  path: 'product-category',
  version: '1',
})
@UseGuards(AuthGuard('jwt'))
export class ProductCategoryController {
  constructor(
    private readonly productCommandService: ProductCategoryCommandService,
    private readonly productQueryService: ProductCategoryQueryService,
  ) {}

  @Post()
  async create(@Body() createProductCategoryDto: CreateProductCategoryDto) {
    const data = await this.productCommandService.create(
      createProductCategoryDto,
    );

    return formatGetDetailResponse<ProductCategory>(data);
  }

  @Get()
  async findAllAndCount(
    @Query() { page = 1, pageSize = 20, ...rest }: GetListProductCategoryDto,
  ) {
    const { take, skip } = parsePagination(page, pageSize);
    const { data, totalCount } = await this.productQueryService.findAllAndCount(
      {
        take,
        skip,
        ...rest,
      },
    );

    return formatGetListResponse<ProductCategory>(
      data,
      totalCount,
      page,
      pageSize,
    );
  }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number) {
    const data = await this.productQueryService.findOne(id);
    return formatGetDetailResponse<ProductCategory>(data);
  }

  @Get(':id/children')
  async findChildren(
    @Param('id', ParseIntPipe) id: number,

    @Query() query: GetListProductCategoryDto,
  ) {
    const data = await this.productQueryService.findChildren(id, query);

    return formatGetDetailResponse<ProductCategory[]>(data);
  }

  @Patch(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateProductCategoryDto: UpdateProductCategoryDto,
  ) {
    const data = await this.productCommandService.update(
      id,
      updateProductCategoryDto,
    );

    return formatGetDetailResponse<ProductCategory>(data);
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
