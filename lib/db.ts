import { PrismaClient } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';
import pg from 'pg';

const prismaClientSingleton = () => {
  // 1. Setup the connection pool using your DATABASE_URL
  const pool = new pg.Pool({ connectionString: process.env.DATABASE_URL });
  
  // 2. Create the Driver Adapter (Required for Prisma 7)
  const adapter = new PrismaPg(pool);
  
  // 3. Pass the adapter to the Client
  return new PrismaClient({ adapter });
};

const globalForPrisma = globalThis as unknown as {
  prisma: ReturnType<typeof prismaClientSingleton> | undefined;
};

export const db = globalForPrisma.prisma ?? prismaClientSingleton();

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = db;
