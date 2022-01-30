import { Test, TestingModule } from '@nestjs/testing';
import { getConnectionToken, MongooseModule } from '@nestjs/mongoose';
import { Connection } from 'mongoose';

import { ProductsService } from './products.service';
import { ProductSchema } from './entities/product.entity';

import DbModule, { closeMongoConnection } from '../db-test.module';

describe('ProductsService', () => {
  let service: ProductsService;
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
      providers: [ProductsService],
    }).compile();

    service = module.get<ProductsService>(ProductsService);
    connection = await module.get(getConnectionToken());
  });

  afterEach(async () => {
    await connection.close();
    await closeMongoConnection();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should save a product', async () => {
    const result = await service.create(mockProduct);

    expect(result).toBeDefined();
  });

  it('should get all products', async () => {
    const result = await service.findAll();

    expect(result).toBeDefined();
  });

  it('should get specific product', async () => {
    const createCustomer = await service.create(mockProduct);

    const result = await service.findOne(createCustomer._id);

    expect(result).toBeDefined();
  });
});
