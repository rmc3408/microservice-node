import request from 'supertest';
import app from '../../config/server';
import mongoose from 'mongoose';

const email: string = 'test@test.com';

it('returns a 404 if the provided id does not exist', async () => {
  const id = new mongoose.Types.ObjectId().toHexString();

  await request(app)
    .put(`/api/tickets/update/${id}`)
    .set('Cookie', global.getSignIn(email))
    .send({
      title: 'ABCDE',
      price: 20,
    })
    .expect(404);
});

it('returns a 401 if the user is not authenticated', async () => {
  const id = new mongoose.Types.ObjectId().toHexString();

  await request(app)
    .put(`/api/tickets/update/${id}`)
    .send({
      title: 'aslkdfj',
      price: 20,
    })
    .expect(401);
});

it('returns a 401 if the user does not own the ticket', async () => {
  const cookie1 = global.getSignIn(email)

  const response = await request(app)
    .post('/api/tickets/create')
    .set('Cookie', cookie1)
    .send({
      title: 'asldkfj',
      price: 20,
    });

  await request(app)
    .put(`/api/tickets/update/${response.body.id}`)
    .set('Cookie', ['Wrong cookie'])
    .send({
      title: 'alskdjflskjdf',
      price: 1000,
    })
    .expect(401);
});

it('returns a 400 if the user provides an invalid title or price', async () => {
  const cookie = global.getSignIn(email)

  const response = await request(app)
    .post('/api/tickets/create')
    .set('Cookie', cookie)
    .send({
      title: 'asldkfj',
      price: 20,
    });

  await request(app)
    .put(`/api/tickets/update/${response.body.id}`)
    .set('Cookie', cookie)
    .send({
      title: '',
      price: 20,
    })
    .expect(400);

  await request(app)
    .put(`/api/tickets/update/${response.body.id}`)
    .set('Cookie', cookie)
    .send({
      title: 'alskdfjj',
      price: -10,
    })
    .expect(400);
});

it('updates the ticket provided valid inputs', async () => {
  const cookie = global.getSignIn(email)

  const response = await request(app)
    .post('/api/tickets/create')
    .set('Cookie', cookie)
    .send({
      title: 'WRONG',
      price: 11,
    });

  await request(app)
    .put(`/api/tickets/update/${response.body.id}`)
    .set('Cookie', cookie)
    .send({
      title: 'RIGHT',
      price: 100,
    })
    .expect(204);

  const ticketResponse = await request(app)
    .get(`/api/tickets/read/${response.body.id}`)

  expect(ticketResponse.body.title).toEqual('RIGHT');
  expect(ticketResponse.body.price).toEqual(100);
});
