import request from 'supertest';
import app from '../../config/server';


it('Should returns a EMPTY cookie on SIGN OUT', async () => {

  await request(app)
    .post('/api/users/signup')
    .send({
      email: 'test@test.com',
      password: 'password'
    })

  const EMPTY_COOKIE = 'session=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT; httponly'
  const response1 = await request(app)
    .post('/api/users/signin')
    .send({
      email: 'test@test.com',
      password: 'password'
    })
  expect(response1.get('set-cookie')[0]).not.toBe(EMPTY_COOKIE)
  
  const response2 = await request(app)
    .post('/api/users/signout')
    .send({
      email: 'test@test.com',
      password: 'password'
    })
    .expect(200);

  expect(response2.get('set-cookie')[0]).toBe(EMPTY_COOKIE)
});