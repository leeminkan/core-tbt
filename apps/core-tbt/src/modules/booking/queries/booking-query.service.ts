import { Injectable, NotFoundException } from '@nestjs/common';
import { BookingRepository } from '@app/core-infrastructure';
import { Booking } from '@app/core-domain';

@Injectable()
export class BookingQueryService {
  constructor(private readonly bookingRepository: BookingRepository) {}

  async findAllAndCount(): Promise<{
    data: Booking[];
    totalCount: number;
  }> {
    return await this.bookingRepository.findAllAndCount({ take: 20 });
  }

  async findOne(id: number): Promise<Booking> {
    const booking = await this.bookingRepository.findById(id);

    if (!booking) {
      throw new NotFoundException(`Booking with ID ${id} not found`);
    }

    return booking;
  }
}
