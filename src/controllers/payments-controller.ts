import { AuthenticatedRequest } from "@/middlewares";
import { paymentsService } from "@/services/payments-service";
import { Response } from "express";
import httpStatus from "http-status";

export async function getPayments(req: AuthenticatedRequest, res: Response) {
  const { ticketId }= req.query as Record<string, string>;
  if(!ticketId) return res.send(httpStatus.BAD_REQUEST);

  try {
    const payment = await paymentsService.getPayment(ticketId);
    if(!payment) {
      return res.send(httpStatus.NOT_FOUND);
    }
    return res.status(httpStatus.OK).send(payment);
  } catch (error) {
    if (error.name === "NotFoundError") {
      return res.sendStatus(httpStatus.NOT_FOUND);
    }
    if(error.name === "UnauthorizedError") {
      return res.sendStatus(httpStatus.UNAUTHORIZED);
    }
    return res.sendStatus(httpStatus.NOT_FOUND);
  }
}

export async function postPayment(req: AuthenticatedRequest, res: Response) {
  const { ticketId, cardData } = req.body;
  const { userId } = req;
  if(!ticketId || !cardData) {return res.send(httpStatus.BAD_REQUEST);}
  try {
    const payment = await paymentsService.postPayment(ticketId, cardData.issuer, cardData.number, userId);
    return res.status(httpStatus.OK).send(payment);
  } catch (error) {
    if (error.name === "NotFoundError") {
      return res.sendStatus(httpStatus.NOT_FOUND);
    }
    if(error.name === "UnauthorizedError") {
      return res.sendStatus(httpStatus.UNAUTHORIZED);
    }
    
    return res.sendStatus(httpStatus.UNAUTHORIZED);
  }
}

