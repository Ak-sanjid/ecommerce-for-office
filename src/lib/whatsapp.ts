export async function sendWhatsApp(phone: string, message: string): Promise<boolean> {
  const token = process.env.WA_TOKEN;
  const phoneId = process.env.WA_PHONE_ID;
  const to = phone.replace(/\D/g, "");
  if (!token || !phoneId) {
    console.log(`[WA dry-run] ${to}: ${message}`);
    return false;
  }
  const res = await fetch(`https://graph.facebook.com/v19.0/${phoneId}/messages`, {
    method: "POST",
    headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      messaging_product: "whatsapp",
      to,
      type: "text",
      text: { body: message },
    }),
  });
  return res.ok;
}
