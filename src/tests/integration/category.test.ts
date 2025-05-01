import request from 'supertest';
import app from '../../app';

let token: string;

beforeAll(async () => {
  await request(app).post('/api/auth/register').send({ email: 'admin@example.com', password: 'admin123' });
  const res = await request(app).post('/api/auth/login').send({ email: 'admin@example.com', password: 'admin123' });
  token = res.body.token;
});

describe('CategoryController', () => {
  it('should create a root category', async () => {
    const res = await request(app)
      .post('/api/category')
      .set('Authorization', `Bearer ${token}`)
      .send({ name: 'Electronics' });

    expect(res.statusCode).toBe(201);
    expect(res.body.name).toBe('Electronics');
  });

  it('should fetch all categories as a tree', async () => {
    await request(app)
      .post('/api/category')
      .set('Authorization', `Bearer ${token}`)
      .send({ name: 'Home Appliances' });

    const res = await request(app)
      .get('/api/category')
      .set('Authorization', `Bearer ${token}`);

    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  it('should not allow creating category without auth', async () => {
    const res = await request(app)
      .post('/api/category')
      .send({ name: 'Unauthorized' });

    expect(res.statusCode).toBe(401);
  });
});
