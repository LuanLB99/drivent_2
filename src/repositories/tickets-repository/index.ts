import { prisma } from "@/config";
import { Enrollment, TicketStatus, TicketType } from "@prisma/client";

async function getTickets() {
  return prisma.ticket.findMany();
}

async function getTypeTickets() {
  return prisma.ticketType.findMany();
}

async function getTypeTicketById(ticketTypId: number) {
  return prisma.ticketType.findFirst({
    where: { id: ticketTypId }
  });
}

async function getTicketById(ticketId: number) {
  return prisma.ticket.findFirst({
    where: { id: ticketId }
  });
}

async function insertTicket(TicketTypeId: number, haveEnrollment: Enrollment) {
  return prisma.ticket.create({
    data: {
      ticketTypeId: TicketTypeId,
      enrollmentId: haveEnrollment.id,
      status: TicketStatus.RESERVED
    }
  });
}

async function updateTicket(ticketId: number) {
  return prisma.ticket.update({
    where: { id: ticketId },
    data: {
      status: TicketStatus.PAID
    }
  });
}

const TicketsRepository = {
  getTypeTickets,
  getTickets,
  getTypeTicketById,
  getTicketById,
  insertTicket,
  updateTicket
};

export default TicketsRepository;
