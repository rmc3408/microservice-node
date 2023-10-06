import request from 'supertest';
import app from '../../config/server';

const email = 'test@test.com'
const password = 'password'

it('Should get 401 from CURRENT due to no cookie', async () => {

  await request(app)
    .post('/api/users/signup')
    .send({ email, password })
  
  await request(app)
    .post('/api/users/signin')
    .send({ email, password })


  const response = await request(app)
    .get('/api/users/current')
    .expect(401)
  expect(response.body.errors[0].message).toBe('Current User not found')
})

it('Should get User object CURRENT', async () => {

  const cookie = await savedCookie(email, password)

  await request(app)
    .post('/api/users/signin')
    .send({ email, password })


  const response2 = await request(app)
    .get('/api/users/current')
    .set('Cookie', cookie)
    .expect(200)

  expect(response2.body).not.toBe('Current User not found')
  expect(response2.body.currentUser.email).toBe(email)
})