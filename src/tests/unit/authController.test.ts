import request from 'supertest';
import app from '../../app';
import User from '../../models/User';

describe('AuthController', () => {
  it('should register a user', async () => {
    const res = await request(app)
      .post('/api/auth/register')
      .send({ email: 'test@example.com', password: '123456' });

    expect(res.statusCode).toBe(201);
    expect(res.body.message).toBe('User registered successfully');

    const user = await User.findOne({ email: 'test@example.com' });
    expect(user).not.toBeNull();
  });

  it('should not register an existing user', async () => {
    await request(app).post('/api/auth/register').send({ email: 'test@example.com', password: '123456' });

    const res = await request(app).post('/api/auth/register').send({ email: 'test@example.com', password: '123456' });
    expect(res.statusCode).toBe(400);
  });

  it('should login a user and return token', async () => {
    await request(app).post('/api/auth/register').send({ email: 'test2@example.com', password: '123456' });

    const res = await request(app).post('/api/auth/login').send({ email: 'test2@example.com', password: '123456' });
    expect(res.statusCode).toBe(200);
    expect(res.body.token).toBeDefined();
  });
});
