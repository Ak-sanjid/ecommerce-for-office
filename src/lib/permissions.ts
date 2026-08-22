/**
 * Pure role/permission model — safe to import from client components
 * (no Node built-ins or fs). Server-side user management lives in `rbac.ts`.
 */

export type Role = "owner" | "manager" | "staff";

export type Permission =
  | "orders.view"
  | "orders.update"
  | "inventory.manage"
  | "coupons.manage"
  | "catalog.manage"
  | "settings.manage"
  | "team.manage";

export const ROLES: Role[] = ["owner", "manager", "staff"];

export const ROLE_LABELS: Record<Role, string> = {
  owner: "Owner",
  manager: "Manager",
  staff: "Staff",
};

export const ROLE_PERMISSIONS: Record<Role, Permission[]> = {
  owner: [
    "orders.view",
    "orders.update",
    "inventory.manage",
    "coupons.manage",
    "catalog.manage",
    "settings.manage",
    "team.manage",
  ],
  manager: [
    "orders.view",
    "orders.update",
    "inventory.manage",
    "coupons.manage",
    "catalog.manage",
    "settings.manage",
  ],
  staff: ["orders.view", "inventory.manage"],
};

export const PERMISSION_LABELS: Record<Permission, string> = {
  "orders.view": "View orders",
  "orders.update": "Update order status",
  "inventory.manage": "Manage inventory",
  "coupons.manage": "Manage coupons",
  "catalog.manage": "Edit catalog / layout",
  "settings.manage": "Store settings & Go Live",
  "team.manage": "Manage admin team",
};

export function can(role: Role | null | undefined, perm: Permission): boolean {
  if (!role) return false;
  return (ROLE_PERMISSIONS[role] ?? []).includes(perm);
}

export function permissionsFor(role: Role): Permission[] {
  return [...(ROLE_PERMISSIONS[role] ?? [])];
}
