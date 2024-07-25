import { Schema, model, Document, Model } from 'mongoose';

// 1. Create an interface representing a document in MongoDB.

// Incoming Properties required to create ticket
interface ITickeCreator {
  title: string;
  price: number;
  userId: string;
}
// Outcoming Properties Saved in the Database
interface ITicketDocs extends Document {
  title: string;
  price: number;
  userId: string;
  createdAt: string;
}
// Incoming Method to transform from creator to Docs
interface ITicketMethods {
  build(attrs: ITickeCreator): ITicketDocs
}

// Properties the ticket model has
interface ITicketModel extends Model<ITickeCreator, {}, ITicketMethods> {
  build(attrs: ITickeCreator): ITicketDocs
}


// 2. Create a Schema corresponding to the document interface.
const ticketSchema = new Schema<ITicketDocs, ITicketModel, ITicketMethods>(
  {
  title: { type: String, required: true },
  price: { type: Number, required: true },
  userId: { type: String, required: true },
  createdAt: { type: String }
  },
  {
    toJSON: {
      transform(_doc, ret) {
        ret.id = ret._id
        delete ret._id
        delete ret.__v
      },
    },
  }
);

// Perform this tasks everytime using Model
ticketSchema.statics.build = (attrs: ITickeCreator) => {
  //console.log('Object Build', attrs)
  const newAttrs = {
    ...attrs,
    createdAt: new Date().toISOString()
  }
  const newTicket = new Ticket(newAttrs)
  //console.log('Object Built', newTicket)
  return newTicket
}
ticketSchema.pre('save', function(): void {
  //console.log('Final Ticket Object Model', this)
});

// 3. Create a Model.
const Ticket = model<ITicketDocs, ITicketModel>('Ticket', ticketSchema);

export default Ticket