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

import { SessionCommandService } from '@app/core-tbt/modules/session';

import { UserCommandService } from './commands/user-command.service';
import { CreateUserDto } from './dtos/create-user.dto';
import { UpdateUserDto } from './dtos/update-user.dto';
import { UserQueryService } from './queries/user-query.service';

@Controller({
  path: 'user',
  version: '1',
})
@UseGuards(AuthGuard('jwt'))
export class UserController {
  constructor(
    private readonly userCommandService: UserCommandService,
    private readonly userQueryService: UserQueryService,
    private readonly sessionCommandService: SessionCommandService,
  ) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.userCommandService.create(createUserDto);
  }

  @Get()
  findAllAndCount() {
    return this.userQueryService.findAllAndCount();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.userQueryService.findOne(id);
  }

  @Get('/:id/sessions')
  findAllAndCountByUserId(@Param('id', ParseIntPipe) id: number) {
    return this.sessionCommandService.findAllAndCountByUserId(id);
  }

  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    return this.userCommandService.update(id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.userCommandService.remove(id);
  }
}
