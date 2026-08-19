import { cookies } from "next/headers";
import { readStore, updateStore, type UserRow } from "./jsonStore";
import { cuidLike } from "./ids";
import { normalizeBdPhone } from "./phone";

export function listUsers() {
  return readStore().users;
}

export function findUser(id?: string | null) {
  if (!id) return null;
  return readStore().users.find((u) => u.id === id) ?? null;
}

export function upsertUser(input: { id?: string; name?: string; email?: string; phone?: string }): UserRow {
  const phone = input.phone ? normalizeBdPhone(input.phone) ?? input.phone : undefined;
  const store = readStore();
  const existing =
    (input.id && store.users.find((u) => u.id === input.id)) ||
    (input.email && store.users.find((u) => u.email === input.email)) ||
    (phone && store.users.find((u) => u.phone === phone));

  const ref = cookies().get("glow_ref")?.value;

  if (existing) {
    const next: UserRow = {
      ...existing,
      name: input.name ?? existing.name,
      email: input.email ?? existing.email,
      phone: phone ?? existing.phone,
      referredBy: existing.referredBy ?? ref,
    };
    updateStore((s) => ({
      ...s,
      users: s.users.map((u) => (u.id === existing.id ? next : u)),
    }));
    return next;
  }

  const row: UserRow = {
    id: input.id || cuidLike("u_"),
    name: input.name,
    email: input.email,
    phone,
    glowPoints: 0,
    orderCount: 0,
    totalSpent: 0,
    referredBy: ref,
    createdAt: new Date().toISOString(),
  };
  updateStore((s) => ({ ...s, users: [row, ...s.users] }));
  return row;
}
