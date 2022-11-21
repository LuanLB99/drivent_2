
import { notFoundError, unauthorizedError } from "@/errors";
import { paymentsRepository } from "@/repositories/payments-repository";
import TicketsRepository from "@/repositories/tickets-repository";

async function getPayment(ticketId: string): Promise<any> {
  const payment =  await paymentsRepository.getPayment(Number(ticketId));
  const ticket = await TicketsRepository.getTicketById(payment.ticketId);
  if(!ticket) throw notFoundError();
  return payment;
} 

async function postPayment(ticketId: number, cardIssuer: string, cardLastDigits: string) {
  const ticket = await TicketsRepository.getTicketById(ticketId);
  const ticketType = await TicketsRepository.getTypeTicketById(ticket.ticketTypeId);
  const payment = await paymentsRepository.postPayment(ticket.id, cardIssuer, cardLastDigits, ticketType.price);
  const updateTicket = await TicketsRepository.updateTicket(ticket.id); 
  console.log(payment);
  return payment;
}

const paymentsService = {
  getPayment,
  postPayment
};

export { paymentsService };
