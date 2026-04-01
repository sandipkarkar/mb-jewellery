/** WhatsApp click-to-chat: full international number without + (India +91). */
export const WHATSAPP_PHONE_E164 = '918866485742';

export function whatsappUrl(message?: string): string {
  const base = `https://wa.me/${WHATSAPP_PHONE_E164}`;
  const trimmed = message?.trim();
  if (!trimmed) return base;
  return `${base}?text=${encodeURIComponent(trimmed)}`;
}
