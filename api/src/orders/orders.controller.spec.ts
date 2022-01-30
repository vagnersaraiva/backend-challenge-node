import { Test, TestingModule } from '@nestjs/testing';
import { getConnectionToken, MongooseModule } from '@nestjs/mongoose';
import { Connection } from 'mongoose';

import { OrdersController } from './orders.controller';
import { OrdersService } from './orders.service';
import { OrderSchema } from './entities/order.entity';

import DbModule, { closeMongoConnection } from '../db-test.module';

describe('OrdersController', () => {
  let controller: OrdersController;
  let connection: Connection;

  const orderDto = {
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
      controllers: [OrdersController],
      providers: [OrdersService],
    }).compile();

    controller = module.get<OrdersController>(OrdersController);
    connection = await module.get(getConnectionToken());
  });

  afterEach(async () => {
    await connection.close();
    await closeMongoConnection();
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should create order', async () => {
    const result = await controller.create(orderDto);

    expect(result).toBeDefined();
  });

  it('should get order by id', async () => {
    const order = await controller.create(orderDto);

    const result = await controller.findOne(order.id);

    expect(result).toBeDefined();
  });
});
