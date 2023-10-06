import request from 'supertest';
import app from '../config/server';

it('Should returns a 201 on successful SIGN UP', async () => {
  return request(app)
    .post('/api/users/signup')
    .send({
      email: 'test@test.com',
      password: 'password'
    })
    .expect(201);
});

it('Should returns a 400 on SIGN UP due to wrong email', async () => {
  return request(app)
    .post('/api/users/signup')
    .send({
      email: 'testtest.com',
      password: 'password'
    })
    .expect(400);
});

it('Should returns a 400 on SIGN UP due to wrong password', async () => {
  return request(app)
    .post('/api/users/signup')
    .send({
      email: 'test@test.com',
      password: 'pa'
    })
    .expect(400);
});

it('Should returns a 400 on SIGN UP due to empty body', async () => {
  return request(app)
    .post('/api/users/signup')
    .send({})
    .expect(400);
});

it('Should NOT allow SIGN UP due to same email', async () => {
  await request(app)
    .post('/api/users/signup')
    .send({
      email: 'test@test.com',
      password: 'secret123'
    })
    .expect(201);

  await request(app)
    .post('/api/users/signup')
    .send({
      email: 'test@test.com',
      password: 'secret123'
    })
    .expect(400);
});