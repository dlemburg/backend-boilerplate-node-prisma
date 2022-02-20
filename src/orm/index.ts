import { PrismaClient } from "@prisma/client";

export const initDataLayer = () => {
  const prisma = new PrismaClient();

  return prisma;
};
