import 'dotenv/config';
import { defineConfig } from "prisma/config";

// Note: Do NOT import or instantiate `PrismaClient` here. The Prisma
// configuration file is loaded by the Prisma CLI before the client is
// generated. Instantiating the client here causes a circular dependency
// (client is not yet generated) and prevents `prisma generate` from running.

export default defineConfig({
  // Use paths relative to this config file / project root. Avoid repeating the
  // top-level folder name so Prisma resolves the paths correctly whether the
  // command is run from the repository root or the project folder.
  schema: "./prisma/schema.prisma",
  migrations: {
    path: "./prisma/migrations",
  },
  datasource: {
    url: process.env.DATABASE_URL || "",
  },
});
