import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

import { CustomerCommandService } from './commands/customer-command.service';
import { CreateCustomerDto } from './dtos/create-customer.dto';
import { UpdateCustomerDto } from './dtos/update-customer.dto';
import { CustomerQueryService } from './queries/customer-query.service';

@Controller({
  path: 'customer',
  version: '1',
})
@UseGuards(AuthGuard('jwt'))
export class CustomerController {
  constructor(
    private readonly customerCommandService: CustomerCommandService,
    private readonly customerQueryService: CustomerQueryService,
  ) {}

  @Post()
  create(@Body() createCustomerDto: CreateCustomerDto) {
    return this.customerCommandService.create(createCustomerDto);
  }

  @Get()
  findAllAndCount() {
    return this.customerQueryService.findAllAndCount();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.customerQueryService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateCustomerDto: UpdateCustomerDto,
  ) {
    return this.customerCommandService.update(id, updateCustomerDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.customerCommandService.remove(id);
  }
}
