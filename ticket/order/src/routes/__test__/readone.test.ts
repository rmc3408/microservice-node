import request from 'supertest';
import app from '../../config/server';
import { Types } from 'mongoose';


const email: string = 'test@test.com';
const title: string = 'Almond';
const price: number = 23.99
const userId: string = '123456789'
const ObjId: Types.ObjectId = new Types.ObjectId()

it('Should return a 404 if ticket is not found', async () => {
  const cookie = global.getSignIn(email)

  await request(app)
    .post('/api/tickets/create')
    .set('Cookie', cookie)
    .send({ title, price, userId })

  const response1 = await request(app)
    .get('/api/tickets/read/' + ObjId)

  expect(response1.statusCode).toEqual(404)
});

it('Should return a 400 if ID params is invalid', async () => {
  const cookie = global.getSignIn(email)

  await request(app)
    .post('/api/tickets/create')
    .set('Cookie', cookie)
    .send({ title, price, userId })

  const response1 = await request(app)
    .get('/api/tickets/read/' + 'RANDOM_ID_VALUE')

  expect(response1.statusCode).toEqual(400)
  expect(response1.body.errors[0].message).toBe('Object Id must be valid')
});

it('Should return a 200 and the ticket found', async () => {
  const cookie = global.getSignIn(email)

  const created = await request(app)
    .post('/api/tickets/create')
    .set('Cookie', cookie)
    .send({ title, price, userId })

  const ticketId = created.body.id

  const response = await request(app)
    .get('/api/tickets/read/' + ticketId)

  expect(response.statusCode).toEqual(200)
  expect(response.body).toEqual({ 
    "createdAt": created.body.createdAt, 
    "id": created.body.id, 
    "price": price, 
    "title": title, 
    "userId": userId 
  })
});