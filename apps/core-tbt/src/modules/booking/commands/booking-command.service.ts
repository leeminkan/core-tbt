import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import {
  BookingRepository,
  CustomerRepository,
  UnitOfWork,
} from '@app/core-infrastructure';
import {
  Booking,
  bookingStatus,
  BookingUpdateStatusError,
} from '@app/core-domain';
import { Nullable } from '@app/core-shared';

import { CreateBookingDto } from '../dtos/create-booking.dto';
import { UpdateBookingDto } from '../dtos/update-booking.dto';

@Injectable()
export class BookingCommandService {
  constructor(
    private readonly bookingRepository: BookingRepository,
    private readonly customerRepository: CustomerRepository,
    private readonly uow: UnitOfWork,
  ) {}

  async create(createBookingDto: CreateBookingDto): Promise<Booking> {
    const customer = await this.customerRepository.findById(
      createBookingDto.customerId,
    );
    if (!customer) {
      throw new NotFoundException('Customer is not found!');
    }

    const booking = await this.bookingRepository.create({
      ...createBookingDto,
      status: bookingStatus.CREATED,
    });
    return booking;
  }

  async update(
    id: number,
    updateBookingDto: UpdateBookingDto,
  ): Promise<Nullable<Booking>> {
    await this.bookingRepository.findAndUpdateById(id, updateBookingDto);
    return await this.bookingRepository.findById(id);
  }

  async cancel(id: number) {
    try {
      return await this.uow.runInTransactionWithRetry(async (manager) => {
        const booking = await this.bookingRepository.findById(id, {
          unitOfWorkManager: manager,
        });
        if (!booking) {
          throw new NotFoundException('Booking is not found!');
        }

        booking.cancel();

        await this.bookingRepository.updateByIdVersion(
          { id, version: booking.version },
          booking,
          {
            unitOfWorkManager: manager,
          },
        );

        return await this.bookingRepository.findById(id, {
          unitOfWorkManager: manager,
        });
      });
    } catch (error) {
      if (error instanceof BookingUpdateStatusError) {
        throw new BadRequestException(error.message);
      }
      throw error;
    }
  }

  async remove(id: number): Promise<void> {
    await this.bookingRepository.deleteById(id);
  }
}
