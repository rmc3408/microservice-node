import { Stan } from 'node-nats-streaming';
import { channels } from './enum';

interface Event {
  channelName: channels;
  data: any;
}

export default abstract class BasePublisher<T extends Event> {
  abstract channelName: T['channelName'];
  private client: Stan;

  constructor(natsConnected: Stan) {
    this.client = natsConnected;
  }

  publish(data: T['data']): Promise<string> {
    return new Promise((resolve, reject) => {
      this.client.publish(this.channelName, JSON.stringify(data), (err) => {
        if (err) reject('failed')
        resolve('successfully')
      })
    });
  }
}