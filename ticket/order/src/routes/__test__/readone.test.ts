import request from 'supertest';
import app from '../../config/server'
import Ticket from '../../models/ticket'
import mongoose from 'mongoose';

const email: string = 'test@test.com';
const email2: string = 'user2@test.com'
const title: string = 'Almond';
const price: number = 23.99
const userId: string = new mongoose.Types.ObjectId().toHexString()

it('fetches the order', async () => {
  // Create a ticket
  const ticket = Ticket.build({
    title,
    price,
  });
  await ticket.save();

  const cookie = global.getSignIn(email)
  // make a request to build an order with this ticket
  const { body: order } = await request(app)
    .post('/api/orders/create')
    .set('Cookie', cookie)
    .send({ ticketId: ticket.id })
    .expect(201);

  // make request to fetch the order
  const { body: fetchedOrder } = await request(app)
    .get(`/api/orders/read/${order.id}`)
    .set('Cookie', cookie)
    .send()
    .expect(200);

  expect(fetchedOrder.id).toEqual(order.id);
});

it('returns an error if one user tries to fetch another users order', async () => {
  // Create a ticket
  const ticket = Ticket.build({
    title,
    price,
  });
  await ticket.save();

  const cookie = global.getSignIn(email)
  // make a request to build an order with this ticket
  const { body: order } = await request(app)
    .post('/api/orders/create')
    .set('Cookie', cookie)
    .send({ ticketId: ticket.id })
    .expect(201);
  

  const cookie2 = global.getSignIn(email2)
  // make request to an order from different user -cookie2
  await request(app)
    .get(`/api/orders/read/${order.id}`)
    .set('Cookie', cookie2)
    .send()
    .expect(401);
});