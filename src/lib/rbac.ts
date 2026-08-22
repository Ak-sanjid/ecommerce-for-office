import crypto from "crypto";
import { readStore, updateStore, type AdminUserRow } from "./jsonStore";
import type { Role } from "./permissions";

export type { Role, Permission } from "./permissions";
export { ROLES, ROLE_LABELS, PERMISSION_LABELS, ROLE_PERMISSIONS, can, permissionsFor } from "./permissions";

/* ------------------------------------------------------------------ */
/* Password hashing (scrypt)                                           */
/* ------------------------------------------------------------------ */

export function hashPassword(password: string): string {
  const salt = crypto.randomBytes(16).toString("hex");
  const hash = crypto.scryptSync(password, salt, 32).toString("hex");
  return `${salt}:${hash}`;
}

export function verifyPassword(password: string, stored: string): boolean {
  const [salt, hash] = stored.split(":");
  if (!salt || !hash) return false;
  const expected = Buffer.from(hash, "hex");
  const check = crypto.scryptSync(password, salt, 32);
  return check.length === expected.length && crypto.timingSafeEqual(check, expected);
}

/* ------------------------------------------------------------------ */
/* Admin users                                                         */
/* ------------------------------------------------------------------ */

const OWNER_USERNAME = process.env.ADMIN_USERNAME ?? "owner";
const OWNER_PASSWORD = process.env.ADMIN_PASSWORD ?? "glow-admin";

function seedDefaultUsers(): AdminUserRow[] {
  const now = new Date().toISOString();
  return [
    {
      id: "admin_owner",
      username: OWNER_USERNAME,
      passwordHash: hashPassword(OWNER_PASSWORD),
      role: "owner",
      active: true,
      createdAt: now,
    },
    {
      id: "admin_manager",
      username: "manager",
      passwordHash: hashPassword("glow-manager"),
      role: "manager",
      active: true,
      createdAt: now,
    },
    {
      id: "admin_staff",
      username: "staff",
      passwordHash: hashPassword("glow-staff"),
      role: "staff",
      active: true,
      createdAt: now,
    },
  ];
}

/** Returns all admin users, seeding owner/manager/staff on first run (demo). */
export function listAdminUsers(): AdminUserRow[] {
  let store = readStore();
  if (store.adminUsers.length === 0) {
    store = updateStore((s) => (s.adminUsers.length ? s : { ...s, adminUsers: seedDefaultUsers() }));
  }
  return store.adminUsers;
}

export function findAdminUser(username: string): AdminUserRow | null {
  const target = username.trim().toLowerCase();
  return listAdminUsers().find((u) => u.username.toLowerCase() === target) ?? null;
}

export function upsertAdminUser(input: {
  id?: string;
  username: string;
  role: Role;
  password?: string;
  active?: boolean;
}): AdminUserRow {
  const username = input.username.trim();
  if (!username) throw new Error("Username is required");

  let created: AdminUserRow | null = null;
  updateStore((s) => {
    const existing = s.adminUsers.find((u) => u.id === input.id);
    if (existing) {
      const row: AdminUserRow = {
        ...existing,
        username,
        role: input.role,
        active: input.active ?? existing.active,
        passwordHash: input.password ? hashPassword(input.password) : existing.passwordHash,
      };
      created = row;
      return { ...s, adminUsers: s.adminUsers.map((u) => (u.id === input.id ? row : u)) };
    }
    const row: AdminUserRow = {
      id: `admin_${Date.now().toString(36)}`,
      username,
      passwordHash: hashPassword(input.password ?? "change-me"),
      role: input.role,
      active: input.active ?? true,
      createdAt: new Date().toISOString(),
    };
    created = row;
    return { ...s, adminUsers: [...s.adminUsers, row] };
  });
  return created!;
}

export function removeAdminUser(id: string): boolean {
  if (id === "admin_owner") return false; // never remove the seed owner
  let removed = false;
  updateStore((s) => {
    const next = s.adminUsers.filter((u) => u.id !== id);
    removed = next.length !== s.adminUsers.length;
    return { ...s, adminUsers: next };
  });
  return removed;
}
