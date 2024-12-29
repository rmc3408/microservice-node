import { Stan, Message, SubscriptionOptions } from 'node-nats-streaming'
import { channels } from './enum'
import { TicketCreatedEvent } from './events'

interface Event {
  channelName: channels
  data: any
}

export default abstract class BaseListener<T extends Event> {
  abstract channelName: T['channelName']
  abstract queueGroupName: string
  abstract onMessage(data: T['data'], msg: Message): void
  private client: Stan
  protected ackWait: number = 5 * 1000

  constructor(natsConnected: Stan) {
    this.client = natsConnected
  }

  subscriptionOptions(): SubscriptionOptions {
    return this.client
      .subscriptionOptions()
      .setDeliverAllAvailable()
      .setManualAckMode(true)
      .setAckWait(this.ackWait)
      .setDurableName(this.queueGroupName)
  }

  listen(): void {
    const subscription = this.client.subscribe(this.channelName, this.queueGroupName, this.subscriptionOptions())

    subscription.on('message', (msg: Message) => {
      console.log(`Message received: ${this.channelName} / ${this.queueGroupName}`)

      const parsedData = this.parseMessage(msg)
      this.onMessage(parsedData, msg)
    })
  }

  parseMessage(msg: Message): string {
    const data = msg.getData()
    return typeof data === 'string' ? JSON.parse(data) : JSON.parse(data.toString('utf-8'))
  }
}
