generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

// THIS IS THE NEW MODEL FOR YOUR PROGRESS BAR
model Savings {
  id        String   @id @default(cuid())
  amount    Float
  category  String   @default("Mortgage")
  createdAt DateTime @default(now())
}

// Keep your existing Treat model if you have one
model Treat {
  id        String   @id @default(cuid())
  name      String
  cost      Float
  createdAt DateTime @default(now())
}
