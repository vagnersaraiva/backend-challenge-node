import { Test, TestingModule } from '@nestjs/testing';
import { getConnectionToken, MongooseModule } from '@nestjs/mongoose';
import { Connection } from 'mongoose';

import { OrderSchema } from './entities/order.entity';
import { OrdersService } from './orders.service';

import DbModule, { closeMongoConnection } from '../db-test.module';

describe('OrdersService', () => {
  let service: OrdersService;
  let connection: Connection;

  const mockOrder = {
    customerId: '61f56817f4c04b8e37cf6a69',
    productId: '61f56c17d9c1cac75184c5bc',
    purchaseAmount: 7.11,
    purchaseQuantity: 10,
    purchaseTotalAmount: 71.1,
    orderDate: new Date('2022-01-29'),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        DbModule({
          connectionName: (new Date().getTime() * Math.random()).toString(16),
        }),
        MongooseModule.forFeature([{ name: 'Order', schema: OrderSchema }]),
      ],
      providers: [OrdersService],
    }).compile();

    service = module.get<OrdersService>(OrdersService);
    connection = await module.get(getConnectionToken());
  });

  afterEach(async () => {
    await connection.close();
    await closeMongoConnection();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should save a order', async () => {
    const result = await service.create(mockOrder);

    expect(result).toBeDefined();
  });

  it('should get all orders', async () => {
    const result = await service.findAll();

    expect(result).toBeDefined();
  });

  it('should get specific order', async () => {
    const createCustomer = await service.create(mockOrder);

    const result = await service.findOne(createCustomer._id);

    expect(result).toBeDefined();
  });
});
