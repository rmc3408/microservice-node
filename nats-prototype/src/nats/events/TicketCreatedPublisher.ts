import BasePublisher from './publisher';
import { channels } from './enum';
import { TicketCreatedEvent } from './events';

export default class TicketCreatedPublisher extends BasePublisher<TicketCreatedEvent> {
  channelName: channels.TicketCreated = channels.TicketCreated
}