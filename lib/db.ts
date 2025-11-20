// Load environment variables early
import 'dotenv/config';

// Import Prisma Client
import { PrismaClient } from "@prisma/client";

// Create singleton function
const prismaClientSingleton = () => {
  return new PrismaClient();
};

// TypeScript type definition
declare const globalThis: {
  prismaGlobal: ReturnType<typeof prismaClientSingleton>;
} & typeof global;

// The actual client instance
const db = globalThis.prismaGlobal ?? prismaClientSingleton();

// Export for use in your app
export default db;

// Store in globalThis only in development
if (process.env.NODE_ENV !== "production") globalThis.prismaGlobal = db;