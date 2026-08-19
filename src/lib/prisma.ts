/**
 * Lazy Prisma client. Never hard-import `@prisma/client` at module scope —
 * the client is not generated in this sandbox and there is no live Postgres.
 * When DATABASE_URL points at a real database and the client exists, callers
 * receive a PrismaClient. Otherwise `getPrisma()` returns null and the JSON
 * store (`src/lib/jsonStore.ts`) is the source of truth.
 */
export type PrismaClientLike = {
  product: {
    findMany: (args?: unknown) => Promise<unknown[]>;
    findUnique: (args: unknown) => Promise<unknown>;
    update: (args: unknown) => Promise<unknown>;
  };
  order: {
    create: (args: unknown) => Promise<unknown>;
    findUnique: (args: unknown) => Promise<unknown>;
    findFirst: (args: unknown) => Promise<unknown>;
    findMany: (args?: unknown) => Promise<unknown[]>;
    update: (args: unknown) => Promise<unknown>;
  };
  coupon: {
    findUnique: (args: unknown) => Promise<unknown>;
    update: (args: unknown) => Promise<unknown>;
  };
  user: {
    findUnique: (args: unknown) => Promise<unknown>;
    update: (args: unknown) => Promise<unknown>;
    upsert: (args: unknown) => Promise<unknown>;
  };
  restockAlert: {
    create: (args: unknown) => Promise<unknown>;
    findMany: (args?: unknown) => Promise<unknown[]>;
    update: (args: unknown) => Promise<unknown>;
  };
  inventoryLog: {
    create: (args: unknown) => Promise<unknown>;
  };
  $transaction: <T>(fn: (tx: PrismaClientLike) => Promise<T>) => Promise<T>;
};

let cached: PrismaClientLike | null = null;
let tried = false;

function looksLikePlaceholderDb(url?: string) {
  if (!url) return true;
  return url.includes("user:pass@localhost") || url.includes("localhost:5432/glow");
}

export function getPrisma(): PrismaClientLike | null {
  if (tried) return cached;
  tried = true;
  if (looksLikePlaceholderDb(process.env.DATABASE_URL)) {
    cached = null;
    return cached;
  }
  try {
    // Dynamic require so webpack does not try to resolve a missing client.
    const dyn = new Function("m", "return require(m)") as (m: string) => { PrismaClient: new () => PrismaClientLike };
    const mod = dyn("@prisma/client");
    cached = new mod.PrismaClient();
  } catch {
    cached = null;
  }
  return cached;
}
