import { Test, TestingModule } from '@nestjs/testing';
import { getConnectionToken, MongooseModule } from '@nestjs/mongoose';
import { Connection } from 'mongoose';

import { CustomersController } from './customers.controller';
import { CustomersService } from './customers.service';
import { CustomerSchema } from './entities/customer.entity';

import DbModule, { closeMongoConnection } from '../db-test.module';

describe('CustomersController', () => {
  let controller: CustomersController;
  let connection: Connection;

  const mockCustomer = {
    name: 'Vagner Alves Saraiva',
    documentNumber: '33933309859',
    birthDate: new Date('1985-05-05'),
    active: true,
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        DbModule({
          connectionName: (new Date().getTime() * Math.random()).toString(16),
        }),
        MongooseModule.forFeature([
          { name: 'Customer', schema: CustomerSchema },
        ]),
      ],
      controllers: [CustomersController],
      providers: [CustomersService],
    }).compile();

    controller = module.get<CustomersController>(CustomersController);
    connection = await module.get(getConnectionToken());
  });

  afterEach(async () => {
    await connection.close();
    await closeMongoConnection();
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should create customer', async () => {
    const result = await controller.create(mockCustomer);

    expect(result).toBeDefined();
  });

  it('should get customer by id', async () => {
    const customer = await controller.create(mockCustomer);

    const result = await controller.findOne(customer.id);

    expect(result).toBeDefined();
  });
});
