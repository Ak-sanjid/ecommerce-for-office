export function getTier(points: number) {
  if (points >= 1000) return "VIP";
  if (points >= 500) return "Gold";
  if (points >= 100) return "Silver";
  return "Member";
}

export function pointsForOrder(total: number) {
  return 10 + Math.floor(total / 500);
}
