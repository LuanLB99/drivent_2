import { AuthenticatedRequest } from "@/middlewares";
import TicketsService from "@/services/ticktes-service";
import { Response } from "express";
import httpStatus from "http-status";

export async function getTickets(req: AuthenticatedRequest, res: Response) {
  const { userId } = req;
  try {
    const tickets = await TicketsService.getTickets(userId);
    return res.status(httpStatus.OK).send(tickets);
  } catch (error) {
    if (error.name === "NotFoundError") {
      return res.sendStatus(httpStatus.NOT_FOUND);
    }
    return res.sendStatus(httpStatus.NOT_FOUND);
  }
}

export async function getTicketTypes(req: AuthenticatedRequest, res: Response) {
  try {
    const TicketTypes = await TicketsService.getTypeTickets();
    return res.status(httpStatus.OK).send(TicketTypes);
  } catch (error) {
    return res.sendStatus(httpStatus.NO_CONTENT);
  }
}

export async function postTicketType(req: AuthenticatedRequest, res: Response) {
  const  { ticketTypeId }  = req.body;
  const { userId }= req;
  if(!ticketTypeId) { 
    return res.sendStatus(httpStatus.BAD_REQUEST);
  }
  try {
    const Ticket = await TicketsService.postTicket(ticketTypeId, userId);
    return res.status(httpStatus.CREATED).send(Ticket);
  } catch (error) {
    if (error.name === "NotFoundError") {
      return res.sendStatus(httpStatus.NOT_FOUND);}
    return res.sendStatus(httpStatus.NO_CONTENT);
  }
}
