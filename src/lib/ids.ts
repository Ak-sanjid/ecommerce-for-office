export function cuidLike(prefix = "c"): string {
  return `${prefix}${Date.now().toString(36)}${Math.random().toString(36).slice(2, 10)}`;
}

export function nextOrderNumber(): string {
  return `GLOW${Date.now().toString().slice(-8)}`;
}
