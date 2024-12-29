import { channels } from './enum'

export interface TicketCreatedEvent {
  channelName: channels.TicketCreated
  data: {
    id: string
    title: string
    price: number
    userId: string
  }
}

export interface TicketUpdatedEvent {
  channelName: channels.TicketUpdated
  data: {
    id: string
    title: string
    price: number
    userId: string
  }
}