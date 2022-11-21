import { notFoundError } from "@/errors";
import enrollmentRepository from "@/repositories/enrollment-repository";
import TicketsRepository from "@/repositories/tickets-repository";

async function getTypeTickets(): Promise<any> {
  const allTicketTypes = await TicketsRepository.getTypeTickets();

  return allTicketTypes;
}

async function getTickets(userId: number): Promise<any> {
  const haveEnrollment = await enrollmentRepository.findWithAddressByUserId(userId);
  const tickets = await TicketsRepository.getTickets();
  const haveTicketType =  await TicketsRepository.getTypeTicketById(tickets[0].ticketTypeId);

  const{
    id, ticketTypeId, enrollmentId, status, createdAt, updatedAt
  } = tickets[0];
  
  if(!tickets || !haveEnrollment) throw notFoundError();
  
  const newTicket = {
    id,
    ticketTypeId,
    enrollmentId,
    status,
    TicketType: haveTicketType,
    createdAt, updatedAt,
  };

  return newTicket;
}

async function getTicket(TicketId: number) {
  const ticket = await TicketsRepository.getTicketById(TicketId);
  return ticket;
}

async function postTicket(TicketTypeId: number, userId: number) {
  const haveTicketType =  await TicketsRepository.getTypeTicketById(TicketTypeId);
  const haveEnrollment = await enrollmentRepository.findWithAddressByUserId(userId);
  if(!haveEnrollment) throw notFoundError();
  const insert = await TicketsRepository.insertTicket(TicketTypeId, haveEnrollment);
  const response = {
    id: insert.id,
    status: insert.status,
    enrollmentId: insert.enrollmentId,
    ticketTypeId: insert.ticketTypeId,
    TicketType: haveTicketType,
    createdAt: insert.createdAt,
    updatedAt: insert.updatedAt
  };
  return response;
}

const TicketsService = {
  getTypeTickets,
  getTickets,
  getTicket,
  postTicket
};

export default TicketsService;
