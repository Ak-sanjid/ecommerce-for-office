export const bdt = (n: number) =>
  `৳${Math.round(n).toLocaleString("en-BD", { maximumFractionDigits: 0 })}`;

export const pad = (n: number) => String(n).padStart(2, "0");
