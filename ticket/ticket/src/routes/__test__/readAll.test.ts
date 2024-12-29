import request from 'supertest';
import app from '../../config/server';


const email: string = 'test@test.com';
const title1: string = 'Almond';
const price1: number = 23.99
const title2: string = 'Pasta';
const price2: number = 12.45
const userId: string = '123456789'

it('Should return empty list', async () => {

  const response1 = await request(app)
    .get('/api/tickets/read')

  expect(response1.body).toEqual([])
});

it('Should return list of all tickets', async () => {
  const cookie = global.getSignIn(email)

  await request(app)
    .post('/api/tickets/create')
    .set('Cookie', cookie)
    .send({ title: title1, price: price1, userId })

  const r = await request(app)
    .post('/api/tickets/create')
    .set('Cookie', cookie)
    .send({ title: title2, price: price2, userId })

  const response1 = await request(app)
    .get('/api/tickets/read')

  expect(response1.body.length).toEqual(2)
  expect(response1.statusCode).toBe(200)
});
