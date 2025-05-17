import request from 'supertest';
// import { stan } from '../../config/nats';
import app from '../../config/server';
import Order from '../../models/order';
import Ticket from '../../models/ticket';
import mongoose from 'mongoose';
import { OrderStatus } from '@rmc3408/microservice-node-common';


const email: string = 'test@test.com';
const title: string = 'Almond';
const price: number = 23.99
const userId: string = new mongoose.Types.ObjectId().toHexString()


it('Should return a 404 if ticket does not exist', async () => {
  const cookie = global.getSignIn(email)
  const ticketId = new mongoose.Types.ObjectId()
  
  const response1 = await request(app).post('/api/orders/create').set('Cookie', cookie).send({ ticketId })

  expect(response1.statusCode).toEqual(404)
});

it('Should return error is Ticket is reserved', async () => {
  const cookie = global.getSignIn(email)

  const ticket = Ticket.build({
    title,
    price,
  });
  await ticket.save();

  const order = Order.build({
    userId,
    status: OrderStatus.CREATED,
    expiresAt: new Date(),
    ticket: ticket.id,
  })
  await order.save();

  await request(app)
    .post('/api/orders/create')
    .set('Cookie', cookie)
    .send({ ticketId: ticket.id })
    .expect(400)
});


it('Should returns 201 when creates a order with ticket', async () => {
  const cookie = global.getSignIn(email)

  const ticket = Ticket.build({
    title,
    price,
  })
  await ticket.save()

  await request(app).post('/api/orders/create').set('Cookie', cookie).send({ ticketId: ticket.id }).expect(201)
});

it.todo('Should emit order created event');