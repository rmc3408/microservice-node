import nats from 'node-nats-streaming';
import { randomBytes } from 'crypto';

const clusterId = 'ticket-nats';
const clientId = `client-${randomBytes(4).toString('hex')}`;
const options = { url: 'nats://localhost:4222' };

const stan = nats.connect(clusterId, clientId, options);

stan.on('connect', () => {
  console.clear();
  console.log(`Publisher clientId: ${clientId} connected to NATS`);

  const data = JSON.stringify({
    id: clientId,
    title: 'concert',
    price: 20,
  });

  stan.publish('ticket:created', data, () => {
    console.log('Event published 1');
  });
});

stan.on('close', () => {
  console.log('NATS connection closed');
  process.exit();
});

process.on('SIGINT', () => stan.close());
process.on('SIGTERM', () => stan.close());

