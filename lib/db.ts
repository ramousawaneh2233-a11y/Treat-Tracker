import { PrismaClient } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';
import pg from 'pg';

const prismaClientSingleton = () => {
  // 1. Create a connection pool to Supabase
  const pool = new pg.Pool({ connectionString: process.env.DATABASE_URL });
  
  // 2. Wrap it in the Prisma Driver Adapter
  const adapter = new PrismaPg(pool);
  
  // 3. Pass the adapter to the Client (This fixes the "InitializationError")
  return new PrismaClient({ adapter });
};

const globalForPrisma = globalThis as unknown as {
  prisma: ReturnType<typeof prismaClientSingleton> | undefined;
};

export const db = globalForPrisma.prisma ?? prismaClientSingleton();

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = db;
