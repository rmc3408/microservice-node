import express, { Request, Response } from 'express';
import {
  NotFoundError,
  NotAuthorizedError,
  ticketValidator,
  ticketValidatorHandler,
  authHandler,
  currentUserHandler,
} from '@rmc3408/microservice-node-common';
import Ticket from '../models/ticket';

const router = express.Router();

router.put('/api/tickets/update/:id', authHandler, currentUserHandler, ticketValidator, ticketValidatorHandler, async (req: Request, res: Response) => {
  const ticket = await Ticket.findById(req.params.id);

  if (!ticket) {
    throw new NotFoundError();
  }

  if (ticket.userId !== req.currentUser!.id) {
    throw new NotAuthorizedError();
  }

  ticket.set({
    title: req.body.title,
    price: req.body.price,
  });
  await ticket.save();

  res.status(204).send(ticket);
});

export { router as updateTicketRouter }