import nats, { Stan, SubscriptionOptions, Message } from 'node-nats-streaming';
import { randomBytes } from 'crypto';
import TicketCreatedPublisher from './events/Publisher/TicketCreated';

const clusterId: string = 'ticket-nats'
const clientId: string = `client-${randomBytes(2).toString('hex')}`
const options: { url: string } = { url: 'nats://localhost:4222' }

const stan = nats.connect(clusterId, clientId, options)

stan.on('connect', async () => {
  console.clear();
  console.log(`Publisher clientId: ${clientId} connected to NATS`);

  const publisher = new TicketCreatedPublisher(stan);
  let result: string = 'empty';
  try {
    result = await publisher.publish({
      id: clientId,
      title: 'concert',
      price: 20,
    });
  } catch (error) {
    console.error('Error publishing: ', error)
  } finally {
    console.log('Event published was ', result)
  }
});

stan.on('close', () => {
  console.log('NATS connection closed');
  process.exit();
});

process.on('SIGINT', () => stan.close());
process.on('SIGTERM', () => stan.close());

