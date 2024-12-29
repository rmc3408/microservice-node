import BaseListener from './listener'
import { Message } from 'node-nats-streaming'
import { TicketCreatedEvent } from './events'
import { channels } from './enum'

export default class TicketCreatedListener extends BaseListener<TicketCreatedEvent> {
  readonly channelName: channels.TicketCreated = channels.TicketCreated
  queueGroupName: string = 'payment-service'

  onMessage(data: TicketCreatedEvent['data'], msg: Message): void {
    console.log('Event data ready to be processed!', data)

    msg.ack()
  }
}
