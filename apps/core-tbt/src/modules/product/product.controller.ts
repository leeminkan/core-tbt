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

import {
  formatGetDetailResponse,
  formatGetListResponse,
  parsePagination,
} from '@libs/core-shared';

import { ProductCommandService } from './commands/product-command.service';
import {
  BulkDeleteProductDto,
  CreateProductDto,
  GetListProductDto,
  ProductResponse,
  UpdateProductDto,
} from './dtos';
import { ProductPopulateService } from './product-populate.service';
import { ProductQueryService } from './queries/product-query.service';

@Controller({
  path: 'product',
  version: '1',
})
@UseGuards(AuthGuard('jwt'))
export class ProductController {
  constructor(
    private readonly productCommandService: ProductCommandService,
    private readonly productQueryService: ProductQueryService,
    private readonly productPopulateService: ProductPopulateService,
  ) {}

  @Post()
  async create(@Body() createProductDto: CreateProductDto) {
    const product = await this.productCommandService.create(createProductDto);

    const populatedProduct =
      await this.productPopulateService.populateProductDetail(product);

    return formatGetDetailResponse<ProductResponse>(populatedProduct);
  }

  @Get()
  async findAllAndCount(
    @Query() { page = 1, pageSize = 20, ...rest }: GetListProductDto,
  ) {
    const { take, skip } = parsePagination(page, pageSize);
    const { data, totalCount } = await this.productQueryService.findAllAndCount(
      {
        take,
        skip,
        ...rest,
      },
    );
    const populatedProductList =
      await this.productPopulateService.populateProductList(data);

    return formatGetListResponse<ProductResponse>(
      populatedProductList,
      totalCount,
      page,
      pageSize,
    );
  }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number) {
    const product = await this.productQueryService.findOne(id);

    const populatedProduct =
      await this.productPopulateService.populateProductDetail(product);

    return formatGetDetailResponse<ProductResponse>(populatedProduct);
  }

  @Patch(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateProductDto: UpdateProductDto,
  ) {
    const product = await this.productCommandService.update(
      id,
      updateProductDto,
    );

    const populatedProduct =
      await this.productPopulateService.populateProductDetail(product);

    return formatGetDetailResponse<ProductResponse>(populatedProduct);
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
