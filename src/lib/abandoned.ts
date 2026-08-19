import { readStore, updateStore } from "./jsonStore";

export function saveAbandoned(cart: { items: unknown; phone?: string; email?: string }, sessionId?: string) {
  const id = `abd_${Date.now()}`;
  updateStore((s) => ({
    ...s,
    abandoned: [
      {
        id,
        sessionId,
        phone: cart.phone,
        email: cart.email,
        payload: cart.items,
        remindersSent: 0,
        createdAt: new Date().toISOString(),
      },
      ...s.abandoned,
    ].slice(0, 200),
  }));
  return { id };
}

export function recoverAbandoned(id: string, method: "sms" | "whatsapp" | "email") {
  updateStore((s) => ({
    ...s,
    abandoned: s.abandoned.map((a) =>
      a.id === id
        ? { ...a, remindersSent: a.remindersSent + 1, recoveredAt: new Date().toISOString(), recoveryMethod: method }
        : a,
    ),
  }));
  return true;
}

export function listAbandoned() {
  return readStore().abandoned;
}

export function setRecoveryEnabled(on: boolean) {
  updateStore((s) => ({ ...s, recoveryEnabled: on }));
}
