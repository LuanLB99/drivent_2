import { getTickets, getTicketTypes, postTicketType } from "@/controllers/tickets-controller";
import { authenticateToken } from "@/middlewares";
import { Router } from "express";

const ticketsRouter = Router();

ticketsRouter
  .all("/*", authenticateToken)
  .get("/", getTickets)
  .get("/types", getTicketTypes)
  .post("/", postTicketType);

export { ticketsRouter };
