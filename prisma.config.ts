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
  // datasource is configured inside `prisma/schema.prisma`. Avoid reading
  // environment variables here because the Prisma CLI may import this
  // config before loading `.env`, which can cause "Missing required
  // environment variable" errors. Let the schema file handle the
  // environment variables here because the Prisma CLI may import this
  // config before loading `.env`, which can cause "Missing required
  // environment variable" errors. Let the schema file handle the
  // datasource URL.
});
