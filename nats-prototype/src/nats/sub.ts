import nats from 'node-nats-streaming';
import { randomBytes } from 'crypto';
import TicketCreatedListener from './events/Listener/TicketCreated'

const clusterId: string = 'ticket-nats'
const clientId: string = `client-${randomBytes(2).toString('hex')}`
const options: { url: string } = { url: 'nats://localhost:4222' }

const stan = nats.connect(clusterId, clientId, options)

stan.on('connect', () => {
  console.clear();
  console.log(`Listener clientId: ${clientId} connected to NATS`);

  new TicketCreatedListener(stan).listen();
});

stan.on('close', () => {
  console.log('NATS connection closed');
  process.exit();
});

process.on('SIGINT', () => stan.close());
process.on('SIGTERM', () => stan.close());
