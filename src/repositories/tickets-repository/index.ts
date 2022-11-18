import { prisma } from "@/config";

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

const TicketsRepository = {
  getTypeTickets,
  getTickets,
  getTypeTicketById
};

export default TicketsRepository;
