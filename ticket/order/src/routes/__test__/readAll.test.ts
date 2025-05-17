import request from 'supertest';
// import { stan } from '../../config/nats';
import app from '../../config/server';
import Order from '../../models/order';
import Ticket from '../../models/ticket';
import mongoose from 'mongoose';
import { OrderStatus } from '@rmc3408/microservice-node-common';


const email1: string = 'test1@test.com';
const email2: string = 'test2@test.com'
const userId1: string = '123456789'
const userId2: string = '987654321'

const title1: string = 'Almond';
const price1: number = 23.99;
const title2: string = 'Bike';
const price2: number = 323.04;
const title3: string = 'Concert';
const price3: number = 130.28;


it('Should found specific number of ticket per order', async () => {
  const ticket1 = await Ticket.build({
    title: title1,
    price: price1,
  })
  await ticket1.save()
  const ticket2 = await Ticket.build({
    title: title2,
    price: price2,
  })
  await ticket2.save()
  const ticket3 = await Ticket.build({
    title: title3,
    price: price3,
  })
  await ticket3.save()


  const cookie1 = global.getSignIn(email1)
  await request(app).post('/api/orders/create').set('Cookie', cookie1).send({ ticketId: ticket1.id }).expect(201)

  const cookie2 = global.getSignIn(email2)
  await request(app).post('/api/orders/create').set('Cookie', cookie2).send({ ticketId: ticket2.id }).expect(201)
  await request(app).post('/api/orders/create').set('Cookie', cookie2).send({ ticketId: ticket3.id }).expect(201)

  
  const response2 = await request(app).get('/api/orders/read').set('Cookie', cookie2)
  const response1 = await request(app).get('/api/orders/read').set('Cookie', cookie1)

  expect(response2.body.length).toEqual(2)
  expect(response1.body.length).toEqual(1)
});
