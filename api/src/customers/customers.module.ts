import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { CustomersService } from './customers.service';
import { CustomersController } from './customers.controller';
import { Customer, CustomerSchema } from './entities/customer.entity';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Customer.name, schema: CustomerSchema },
    ]),
  ],
  controllers: [CustomersController],
  providers: [CustomersService],
})
export class CustomersModule {}
