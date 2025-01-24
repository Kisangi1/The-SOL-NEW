import { PrismaClient, type Destination, type Booking } from "@prisma/client"

const globalForPrisma = global as unknown as { prisma: PrismaClient }

export const prisma =
  globalForPrisma.prisma ||
  new PrismaClient({
    log: ["query"],
  })

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma

export async function getDestinations() {
  return await prisma.destination.findMany({
    orderBy: { createdAt: "desc" },
  })
}

export async function getDestinationById(id: string) {
  return await prisma.destination.findUnique({
    where: { id },
  })
}

export async function getDestinationBySlug(slug: string) {
  return await prisma.destination.findFirst({
    where: {
      name: {
        equals: slug.replace(/-/g, " "),
        mode: "insensitive",
      },
    },
  })
}

export async function createDestination(data: Omit<Destination, "id" | "createdAt" | "updatedAt">) {
  return await prisma.destination.create({
    data,
  })
}

export async function updateDestination(
  id: string,
  data: Partial<Omit<Destination, "id" | "createdAt" | "updatedAt">>,
) {
  return await prisma.destination.update({
    where: { id },
    data,
  })
}

export async function deleteDestination(id: string) {
  return await prisma.destination.delete({
    where: { id },
  })
}

export async function createBooking(data: Omit<Booking, "id" | "createdAt" | "updatedAt">) {
  return await prisma.booking.create({
    data,
  })
}

