import type { Product } from '../data/products';
import { SITE_NAME, getProductPageUrl } from '../config/site';

function moneyInr(n: number): string {
  return `₹${n.toLocaleString('en-IN')}`;
}

/**
 * Structured WhatsApp text for a single product order enquiry.
 */
export function buildProductOrderWhatsAppMessage(params: {
  product: Product;
  selectedMetal: string;
  selectedPurity: string;
  quantity: number;
  ringSize?: string;
}): string {
  const { product, selectedMetal, selectedPurity, quantity, ringSize } = params;
  const lineTotal = product.price * quantity;
  const url = getProductPageUrl(product.id);

  const lines = [
    `*Order enquiry — ${SITE_NAME}*`,
    '',
    'Hello,',
    '',
    'I would like to place an order for the following item from your website:',
    '',
    `*Product name:* ${product.name}`,
    `*Product ID / SKU:* ${product.id}`,
    `*Category:* ${product.category}`,
    `*Selected metal:* ${selectedMetal}`,
    `*Selected purity:* ${selectedPurity}`,
    `*Quantity:* ${quantity}`,
  ];

  if (product.category === 'Rings' && ringSize) {
    lines.push(`*Ring size:* ${ringSize}`);
  }

  lines.push(
    '',
    `*Line total (listed price):* ${moneyInr(lineTotal)}`,
    '',
    '*Product page:*',
    url,
    '',
    'Please confirm availability, final price, and next steps.',
    '',
    'Thank you.',
  );

  return lines.join('\n');
}

type CartLine = {
  name: string;
  id: string;
  selectedMetal: string;
  selectedPurity: string;
  quantity: number;
  price: number;
};

/**
 * Structured WhatsApp text for a multi-item cart order.
 */
export function buildCartOrderWhatsAppMessage(cart: CartLine[], cartTotal: number): string {
  const lines = [
    `*Cart order enquiry — ${SITE_NAME}*`,
    '',
    'Hello,',
    '',
    'I would like to order the following items:',
    '',
  ];

  cart.forEach((item, i) => {
    const sub = item.price * item.quantity;
    lines.push(
      `*${i + 1}. ${item.name}*`,
      `   • ID: ${item.id}`,
      `   • ${item.selectedMetal} · ${item.selectedPurity}`,
      `   • Qty: ${item.quantity} → ${moneyInr(sub)}`,
      `   • Link: ${getProductPageUrl(item.id)}`,
      '',
    );
  });

  lines.push(`*Estimated subtotal (listed):* ${moneyInr(cartTotal)}`, '', 'Please confirm availability and total. Thank you.');

  return lines.join('\n');
}
