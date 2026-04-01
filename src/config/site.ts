/** Public site / brand configuration */
export const SITE_NAME = 'M B Brother Gems And Jewellery';

/**
 * Canonical site origin (no trailing slash).
 * Set `VITE_SITE_URL` in `.env` for production (e.g. https://www.yourdomain.com).
 */
export function getSiteUrl(): string {
  const fromEnv = import.meta.env.VITE_SITE_URL as string | undefined;
  if (fromEnv && fromEnv.trim().length > 0) {
    return fromEnv.trim().replace(/\/$/, '');
  }
  if (typeof window !== 'undefined' && window.location?.origin) {
    return window.location.origin;
  }
  return 'https://www.mbbrothergems.com';
}

export function getProductPageUrl(productId: string): string {
  return `${getSiteUrl()}/products/${encodeURIComponent(productId)}`;
}
