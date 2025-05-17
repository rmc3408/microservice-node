import { OrderStatus } from '@rmc3408/microservice-node-common'
import { Document, Model, Schema, model } from 'mongoose'
import Order from './order'

// 1. Create an interface representing a document in MongoDB.

// Incoming Properties required to create ticket
interface ITicketCreator {
  title: string
  price: number
}
// Outcoming Properties Saved in the Database - new instanced methods should be declared here
export interface ITicketDocs extends Document {
  title: string
  price: number
  isReserved(): Promise<boolean>
}

// Properties the ticket model has
interface ITicketModel extends Model<ITicketDocs> {
  build(attrs: ITicketCreator): ITicketDocs
}

// 2. Create a Schema corresponding to the document interface.
const ticketSchema = new Schema<ITicketDocs, ITicketModel>(
  {
    title: { type: String, required: true },
    price: { type: Number, required: true, min: 0 },
  },
  {
    toJSON: {
      transform(_doc: any, ret: any) {
        ret.id = ret._id
        delete ret._id
      },
    },
  }
)

// add function to class STATIC call i.e Ticket.build()
ticketSchema.statics.build = (attrs: ITicketCreator) => {
  return new Ticket(attrs)
}

// add function to class INSTANCE call i.e newTicket.isReserved()
ticketSchema.methods.isReserved = async function(): Promise<boolean> {
  // Check if the ticket is already reserved, query in all orders, if ticket status is not available
  const ticketReserved = await Order.findOne({
    ticket: this['_id'],
    status: {
      $in: [OrderStatus.CREATED, OrderStatus.AWAITPAYMENT, OrderStatus.COMPLETE],
    },
  })
  return !!ticketReserved
}

// 3. Create a Model.
const Ticket = model<ITicketDocs, ITicketModel>('Ticket', ticketSchema)

export default Ticket
