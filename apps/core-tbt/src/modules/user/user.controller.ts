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
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

import { SessionCommandService } from '../session/commands/session-command.service';
import { UserCommandService } from './commands/user-command.service';
import { UserQueryService } from './queries/user-query.service';
import { CreateUserDto } from './dtos/create-user.dto';
import { UpdateUserDto } from './dtos/update-user.dto';

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
