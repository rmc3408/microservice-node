import nats, { Message } from 'node-nats-streaming';
import { randomBytes } from 'crypto';

const clusterId = 'ticket-nats';
const clientId = `client-${randomBytes(4).toString('hex')}`;
const options = { url: 'nats://localhost:4222' };

const stan = nats.connect(clusterId, clientId, options);

stan.on('connect', () => {
  console.clear();
  console.log(`Listener clientId: ${clientId} connected to NATS`);

  const opts = stan.subscriptionOptions();
  opts.setManualAckMode(true); //needs function ack() to manual acknowledgment
  opts.setDeliverAllAvailable(); //whole list of events
  opts.setDurableName('order-service'); //durable subscription - only non acknowledged events

  const subscription = stan.subscribe('ticket:created', 'queue-order-service', opts);
  subscription.on('message', (msg: Message) => {
    const data = msg.getData();
    if (typeof data === 'string') {
      console.log(`Channel ${msg.getSubject()} - Received event #${msg.getSequence()}, with data: ${data}`);
    }

    msg.ack();
  });
});

stan.on('close', () => {
  console.log('NATS connection closed');
  process.exit();
});

process.on('SIGINT', () => stan.close());
process.on('SIGTERM', () => stan.close());
