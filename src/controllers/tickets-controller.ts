import { AuthenticatedRequest } from "@/middlewares";
import TicketsService from "@/services/ticktes-service";
import { Response } from "express";
import httpStatus from "http-status";

export async function getTickets(req: AuthenticatedRequest, res: Response) {
  try {
    const tickets = await TicketsService.getTickets();
    return res.status(httpStatus.OK).send(tickets);
  } catch (error) {
    if (error.name === "NotFoundError") {
      return res.send(httpStatus.NO_CONTENT);
    }
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
