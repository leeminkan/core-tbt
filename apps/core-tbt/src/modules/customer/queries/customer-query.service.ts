import { Injectable, NotFoundException } from '@nestjs/common';

import { Customer, CustomerRepository } from '@libs/core-domain';

@Injectable()
export class CustomerQueryService {
  constructor(private readonly customerRepository: CustomerRepository) {}

  async findAllAndCount(): Promise<{
    data: Customer[];
    totalCount: number;
  }> {
    return await this.customerRepository.findAllAndCount({ take: 20 });
  }

  async findOne(id: number): Promise<Customer> {
    const customer = await this.customerRepository.findById(id);

    if (!customer) {
      throw new NotFoundException(`Customer with ID ${id} not found`);
    }

    return customer;
  }
}
