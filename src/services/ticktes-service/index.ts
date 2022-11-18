import { notFoundError } from "@/errors";
import TicketsRepository from "@/repositories/tickets-repository";

async function getTypeTickets(): Promise<any> {
  const allTicketTypes = await TicketsRepository.getTypeTickets();

  return allTicketTypes;
}

async function getTickets(): Promise<any> {
  const tickets = await TicketsRepository.getTickets();
  const haveTicketType =  await TicketsRepository.getTypeTicketById(tickets[0].ticketTypeId);
  if(!haveTicketType) {
    throw notFoundError();
  }
  const newTicket = {
    tickets,
    TicketType: haveTicketType
  };
  return newTicket;
}

const TicketsService = {
  getTypeTickets,
  getTickets
};

export default TicketsService;
