import { notFoundError, unauthorizedError } from "@/errors";
import enrollmentRepository from "@/repositories/enrollment-repository";
import { paymentsRepository } from "@/repositories/payments-repository";
import TicketsRepository from "@/repositories/tickets-repository";
import TicketsService from "../ticktes-service";

async function getPayment(ticketId: string): Promise<any> {
  const payment =  await paymentsRepository.getPayment(Number(ticketId));
  const ticket = await TicketsRepository.getTicketById(payment.ticketId);
  if(!ticket) throw notFoundError();
  return payment;
} 

async function postPayment(ticketId: number, cardIssuer: string, cardLastDigits: string, userId: number): Promise<any> {
  const myticket = await TicketsService.getTicket(ticketId);
  if(!myticket) throw notFoundError();
  const ticket = await TicketsRepository.getTicketById(ticketId);
  const enrollment = await enrollmentRepository.findWithAddressByUserId(userId);
  if(ticket.enrollmentId != enrollment.id) throw unauthorizedError();
  const ticketType = await TicketsRepository.getTypeTicketById(ticket.ticketTypeId);
  const payment = await paymentsRepository.postPayment(ticket.id, cardIssuer, cardLastDigits, ticketType.price);
  await TicketsRepository.updateTicket(ticket.id); 
  return payment;
}

const paymentsService = {
  getPayment,
  postPayment
};

export { paymentsService };
