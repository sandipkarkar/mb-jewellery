import { SITE_NAME } from './site';

export type PageSeoConfig = {
  /** Short page title (site name is appended automatically). */
  title: string;
  description: string;
  /** Hide from search engines (account, auth, cart, etc.). */
  noindex?: boolean;
};

const baseDesc =
  'Shop certified lab-grown diamond jewellery, fine gems, and custom pieces from M B Brother Gems And Jewellery. Ethical sourcing, IGI/GIA-certified stones, and personal service.';

export const DEFAULT_SEO: PageSeoConfig = {
  title: `Fine Jewellery & Certified Gems`,
  description: baseDesc,
};

/** Exact path → SEO (does not include dynamic product URLs). */
export const PAGE_SEO_BY_PATH: Record<string, PageSeoConfig> = {
  '/': {
    title: 'Fine Jewellery & Certified Lab-Grown Diamonds',
    description: baseDesc,
  },
  '/products': {
    title: 'Jewellery Collection',
    description:
      'Browse rings, earrings, pendants, bracelets, and more. Filter by metal, purity, and price. Order via WhatsApp with M B Brother Gems And Jewellery.',
  },
  '/cart': {
    title: 'Shopping Cart',
    description: 'Review your selected jewellery and send your order on WhatsApp.',
    noindex: true,
  },
  '/wishlist': {
    title: 'Wishlist',
    description: 'Your saved favourite jewellery pieces.',
    noindex: true,
  },
  '/login': {
    title: 'Sign In',
    description: `Sign in to your ${SITE_NAME} account.`,
    noindex: true,
  },
  '/register': {
    title: 'Create Account',
    description: `Create an account with ${SITE_NAME}.`,
    noindex: true,
  },
  '/forgot-password': {
    title: 'Forgot Password',
    description: 'Reset your account password.',
    noindex: true,
  },
  '/account': {
    title: 'My Account',
    description: 'Manage your profile and preferences.',
    noindex: true,
  },
  '/addresses': {
    title: 'Addresses',
    description: 'Manage your delivery addresses.',
    noindex: true,
  },
  '/contact': {
    title: 'Contact Us',
    description:
      'Contact M B Brother Gems And Jewellery by WhatsApp, phone, or email for orders, custom requests, and support.',
  },
  '/about': {
    title: 'About Us',
    description:
      'Learn about M B Brother Gems And Jewellery—our story, values, and commitment to quality gems and ethical jewellery.',
  },
  '/faq': {
    title: 'FAQ',
    description: 'Frequently asked questions about ordering, shipping, returns, and our jewellery.',
  },
  '/privacy': {
    title: 'Privacy Policy',
    description: `How ${SITE_NAME} collects, uses, and protects your personal information.`,
  },
  '/terms': {
    title: 'Terms & Conditions',
    description: `Terms of use and purchase for ${SITE_NAME}.`,
  },
};

/** SEO config for layout shell routes only (not product detail or 404). */
export function getLayoutSeo(pathname: string): PageSeoConfig | null {
  return PAGE_SEO_BY_PATH[pathname] ?? null;
}

export function formatDocumentTitle(pageTitle: string): string {
  const t = pageTitle.trim();
  if (t.toLowerCase().includes(SITE_NAME.toLowerCase())) return t;
  return `${t} | ${SITE_NAME}`;
}

export function truncateMetaDescription(text: string, max = 155): string {
  const t = text.replace(/\s+/g, ' ').trim();
  if (t.length <= max) return t;
  return `${t.slice(0, max - 1).trimEnd()}…`;
}
