import request from 'supertest';
import app from '../../config/server'
import Order from '../../models/order'
import Ticket from '../../models/ticket'
import { OrderStatus } from '@rmc3408/microservice-node-common'

it('marks an order as cancelled', async () => {
  // create a ticket with Ticket Model
  const ticket = Ticket.build({
    title: 'concert',
    price: 20,
  });
  await ticket.save();

  const cookie = global.getSignIn('email@test.com')
  // make a request to create an order
  const { body: order } = await request(app)
    .post('/api/orders/create')
    .set('Cookie', cookie)
    .send({ ticketId: ticket.id })
    .expect(201);

  // cancel the order
  await request(app)
    .delete(`/api/orders/delete/${order.id}`)
    .set('Cookie', cookie)
    .send()
    .expect(204);

  // expectation to make sure the thing is cancelled
  const updatedOrder = await Order.findById(order.id);

  expect(updatedOrder!.status).toEqual(OrderStatus.CANCELLED);
});

it.todo('emits a order cancelled event');
