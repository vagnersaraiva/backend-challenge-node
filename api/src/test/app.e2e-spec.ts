import * as request from 'supertest';

import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';

import { AppModule } from '../app.module';

describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  it('/customers (GET)', () => {
    return request(app.getHttpServer()).get('/customers').expect(200);
  });

  it('/products (GET)', () => {
    return request(app.getHttpServer()).get('/products').expect(200);
  });

  it('/orders (GET)', () => {
    return request(app.getHttpServer()).get('/orders').expect(200);
  });
});
