import { BasePublisher, TicketCreatedEvent, TicketUpdatedEvent, channels } from '@rmc3408/microservice-node-common'

export class TicketCreatedPublisher extends BasePublisher<TicketCreatedEvent> {
  readonly channelName = channels.TicketCreated
}

export class TicketUpdatedPublisher extends BasePublisher<TicketUpdatedEvent> {
  readonly channelName = channels.TicketUpdated
}
