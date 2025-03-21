import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import * as request from 'supertest';
import { AppModule } from '../../src/app.module';

describe('ShoppingCart (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('POST /create-cart should create a new cart', async () => {
    return request(app.getHttpServer())
      .post('/create-cart')
      .send({ customerId: 'customer1' })
      .expect(201)
      .expect((res) => {
        expect(res.body.id).toBeDefined();
        expect(res.body.customer.id).toBe('customer1');
      });
  });

  it('POST /add-product should add a product to the cart', async () => {
    return request(app.getHttpServer())
      .post('/add-product')
      .send({ cartId: 'cart1', productId: 'product1', quantity: 2 })
      .expect(201)
      .expect((res) => {
        expect(res.body.id).toBeDefined();
        expect(res.body.quantity).toBe(2);
      });
  });

  afterAll(async () => {
    await app.close();
  });
});
