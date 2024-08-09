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

import { BookingCommandService } from './commands/booking-command.service';
import { CreateBookingDto } from './dtos/create-booking.dto';
import { UpdateBookingDto } from './dtos/update-booking.dto';
import { BookingQueryService } from './queries/booking-query.service';

@Controller({
  path: 'booking',
  version: '1',
})
@UseGuards(AuthGuard('jwt'))
export class BookingController {
  constructor(
    private readonly bookingCommandService: BookingCommandService,
    private readonly bookingQueryService: BookingQueryService,
  ) {}

  @Post()
  create(@Body() createBookingDto: CreateBookingDto) {
    return this.bookingCommandService.create(createBookingDto);
  }

  @Get()
  findAllAndCount() {
    return this.bookingQueryService.findAllAndCount();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.bookingQueryService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateBookingDto: UpdateBookingDto,
  ) {
    return this.bookingCommandService.update(id, updateBookingDto);
  }

  @Patch(':id/cancel')
  cancel(@Param('id', ParseIntPipe) id: number) {
    return this.bookingCommandService.cancel(id);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.bookingCommandService.remove(id);
  }
}
