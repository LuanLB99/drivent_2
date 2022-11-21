import { prisma } from "@/config";

async function getPayment(ticketId: number): Promise<any> {
  return prisma.payment.findFirst({
    where: { ticketId: ticketId }
  });
}

async function postPayment(ticketId: number, cardIssuer: string, cardLastDigits: string, price: number) {
  return prisma.payment.create({
    data: {
      ticketId: ticketId,
      value: price,
      cardIssuer: cardIssuer,
      cardLastDigits: cardLastDigits.slice(10)
    }
  });
}

const paymentsRepository = {
  getPayment,
  postPayment
};

export { paymentsRepository };
