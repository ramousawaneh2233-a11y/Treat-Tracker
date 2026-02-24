generator client {
  provider        = "prisma-client-js"
  previewFeatures = ["driverAdapters"]
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

model User {
  id     String  @id @default(cuid())
  email  String  @unique
  name   String?
  treats Treat[] 
}

model Treat {
  id          String   @id @default(cuid())
  name        String
  calories    Int?
  createdAt   DateTime @default(now())
  userId      String
  user        User     @relation(fields: [userId], references: [id])
}
