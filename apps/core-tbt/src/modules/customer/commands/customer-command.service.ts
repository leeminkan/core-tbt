import { Injectable } from '@nestjs/common';

import { Customer } from '@libs/core-domain';
import { CustomerRepository } from '@libs/core-infrastructure';

import { CreateCustomerDto } from '../dtos/create-customer.dto';
import { UpdateCustomerDto } from '../dtos/update-customer.dto';

@Injectable()
export class CustomerCommandService {
  constructor(private readonly customerRepository: CustomerRepository) {}

  async create(createCustomerDto: CreateCustomerDto): Promise<Customer> {
    const customer = await this.customerRepository.create({
      ...createCustomerDto,
    });
    return customer;
  }

  async update(
    id: number,
    updateCustomerDto: UpdateCustomerDto,
  ): Promise<Customer> {
    await this.customerRepository.findAndUpdateById(id, updateCustomerDto);
    return await this.customerRepository.findById(id, {
      throwNotFoundError: true,
    });
  }

  async remove(id: number): Promise<void> {
    await this.customerRepository.deleteById(id);
  }
}
