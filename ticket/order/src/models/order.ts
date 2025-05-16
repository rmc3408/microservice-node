import { Schema, model, Document, Model } from 'mongoose';
import { OrderStatus } from '@rmc3408/microservice-node-common';

// 1. Create an interface representing a document in MongoDB.

// Incoming Properties required to create ticket
interface IOrderProps {
  userId: string
  status: OrderStatus
  expiresAt: Date
  ticket: TicketDoc
}
// Outcoming Properties Saved in the Database
interface IOrderDocs extends Document {
  userId: string
  status: OrderStatus
  expiresAt: Date
  ticket: TicketDoc
}
// Incoming Method to transform from creator to Docs
interface IOrderMethods {
  build(attrs: IOrderProps): IOrderDocs
}

// Properties the ticket model has
interface IOrderModel extends Model<IOrderProps, {}, IOrderMethods> {
  build(attrs: IOrderProps): IOrderDocs
}

// 2. Create a Schema corresponding to the document interface.
const orderSchema = new Schema<IOrderDocs, IOrderModel, IOrderMethods>(
  {
    userId: { type: String, required: true },
    status: { type: String, required: true, enum: Object.values(OrderStatus), default: OrderStatus.CREATED },
    expiresAt: { type: Schema.Types.Date, required: true },
    ticket: { type: Schema.Types.ObjectId, ref: 'Ticket' },
  },
  {
    toJSON: {
      transform(_doc, ret) {
        ret.id = ret._id
        delete ret._id
      },
    },
  }
)

// Perform this tasks everytime using Model
orderSchema.statics.build = (attrs: IOrderProps) => {
  return new Order(attrs)
}

// 3. Create a Model.
const Order = model<IOrderDocs, IOrderModel>('Order', orderSchema)

export default Order