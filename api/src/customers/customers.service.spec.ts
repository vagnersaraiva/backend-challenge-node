import { Test, TestingModule } from '@nestjs/testing';
import { getConnectionToken, MongooseModule } from '@nestjs/mongoose';
import { Connection } from 'mongoose';

import { CustomersService } from './customers.service';
import { CustomerSchema } from './entities/customer.entity';

import DbModule, { closeMongoConnection } from '../db-test.module';

describe('CustomersService', () => {
  let service: CustomersService;
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
      providers: [CustomersService],
    }).compile();

    service = module.get<CustomersService>(CustomersService);
    connection = await module.get(getConnectionToken());
  });

  afterEach(async () => {
    await connection.close();
    await closeMongoConnection();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should save a customer', async () => {
    const result = await service.create(mockCustomer);

    expect(result).toBeDefined();
  });

  it('should get all customers', async () => {
    const result = await service.findAll();

    expect(result).toBeDefined();
  });
});
