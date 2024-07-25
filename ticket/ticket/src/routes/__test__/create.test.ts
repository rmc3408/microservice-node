import request from 'supertest';
import app from '../../config/server';
import Ticket from '../../models/ticket';


const email: string = 'test@test.com';
const title: string = 'Almond';
const price: number = 23.99
const userId: string = '123456789'

it('Should NOT return a 404 due to have a CREATE handler', async () => {
  const response1 = await request(app)
    .post('/api/tickets/create')
    .send({})
  
  expect(response1.statusCode).not.toEqual(404)
});

it('Should return 401 Unauthorized response due to missing cookie from signedIn', async () => {
  await request(app)
    .post('/api/tickets/create')
    .send({})
    .expect(401)
});

it('Should return non-401 Unauthorized response because user signedIn', async () => {
  const cookie = global.getSignIn(email)

  const response2 = await request(app)
    .post('/api/tickets/create')
    .set('Cookie', cookie)
    .send({ title, price })

  expect(response2.statusCode).not.toEqual(401)
});

it('Should return a error if an invalid TITLE', async () => {
  const cookie = global.getSignIn(email)

  await request(app)
    .post('/api/tickets/create')
    .set('Cookie', cookie)
    .send({ title: '', price })
    .expect(400)
});

it('Should return a error if an invalid PRICE', async () => {
  const cookie = global.getSignIn(email)

  await request(app)
    .post('/api/tickets/create')
    .set('Cookie', cookie)
    .send({ title, price: -1 })
    .expect(400)
  
  await request(app)
    .post('/api/tickets/create')
    .set('Cookie', cookie)
    .send({ title })
    .expect(400)
});

it('Should returns 201 when creates a ticket', async () => {
  const cookie = global.getSignIn(email)

  await request(app)
    .post('/api/tickets/create')
    .set('Cookie', cookie)
    .send({ title, price, userId })
    .expect(201)
});

it('Should save record in the database when creates a ticket', async () => {
  const cookie = global.getSignIn(email)

  let foundTickets = await Ticket.find({})
  //console.log('Before Creating Ticket', foundTickets)
  expect(foundTickets.length).toEqual(0)

  await request(app)
    .post('/api/tickets/create')
    .set('Cookie', cookie)
    .send({ title, price, userId })
    .expect(201)

  let foundTicketsList = await Ticket.find({})
  //console.log('After created tickets - list', foundTicketsList)
  expect(foundTicketsList.length).toEqual(1)
  expect(foundTicketsList[0].title).toBe('Almond')
});