import { Test, TestingModule } from '@nestjs/testing';
import { getConnectionToken, MongooseModule } from '@nestjs/mongoose';
import { Connection } from 'mongoose';

import { ProductsController } from './products.controller';
import { ProductsService } from './products.service';
import { ProductSchema } from './entities/product.entity';

import DbModule, { closeMongoConnection } from '../db-test.module';

describe('ProductsController', () => {
  let controller: ProductsController;
  let connection: Connection;

  const mockProduct = {
    name: 'CPLE6',
    active: true,
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        DbModule({
          connectionName: (new Date().getTime() * Math.random()).toString(16),
        }),
        MongooseModule.forFeature([{ name: 'Product', schema: ProductSchema }]),
      ],
      controllers: [ProductsController],
      providers: [ProductsService],
    }).compile();

    controller = module.get<ProductsController>(ProductsController);
    connection = await module.get(getConnectionToken());
  });

  afterEach(async () => {
    await connection.close();
    await closeMongoConnection();
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should create product', async () => {
    const result = await controller.create(mockProduct);

    expect(result).toBeDefined();
  });

  it('should get product by id', async () => {
    const product = await controller.create(mockProduct);

    const result = await controller.findOne(product.id);

    expect(result).toBeDefined();
  });
});
