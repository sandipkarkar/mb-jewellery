import { useEffect, useMemo } from 'react';
import { SITE_NAME, getSiteUrl } from '../../config/site';
import { formatDocumentTitle } from '../../config/pageSeo';

const DEFAULT_OG_IMAGE =
  'https://images.unsplash.com/photo-1769230361954-69a5bd0fcb2e?w=1200&h=630&fit=crop';

export type SeoProps = {
  title: string;
  description: string;
  /** Path only, e.g. /products — used for canonical & og:url */
  canonicalPath: string;
  noindex?: boolean;
  image?: string;
};

function upsertMeta(attribute: 'name' | 'property', key: string, content: string) {
  const selector = `meta[${attribute}="${key}"]`;
  let el = document.head.querySelector<HTMLMetaElement>(selector);
  if (!el) {
    el = document.createElement('meta');
    el.setAttribute(attribute, key);
    document.head.appendChild(el);
  }
  el.setAttribute('content', content);
}

function upsertLink(rel: string, href: string) {
  let el = document.head.querySelector<HTMLLinkElement>(`link[rel="${rel}"]`);
  if (!el) {
    el = document.createElement('link');
    el.setAttribute('rel', rel);
    document.head.appendChild(el);
  }
  el.setAttribute('href', href);
}

function upsertJsonLd(id: string, json: object) {
  const existing = document.getElementById(id);
  if (existing) existing.remove();
  const script = document.createElement('script');
  script.id = id;
  script.type = 'application/ld+json';
  script.textContent = JSON.stringify(json);
  document.head.appendChild(script);
}

/**
 * Updates document title, meta tags, canonical, and Open Graph/Twitter cards.
 */
export function Seo({ title, description, canonicalPath, noindex, image }: SeoProps) {
  const siteUrl = getSiteUrl();
  const fullTitle = formatDocumentTitle(title);
  const path = canonicalPath.startsWith('/') ? canonicalPath : `/${canonicalPath}`;
  const canonical = `${siteUrl}${path}`;
  const ogImage = useMemo(() => image?.trim() || DEFAULT_OG_IMAGE, [image]);

  useEffect(() => {
    document.title = fullTitle;

    upsertMeta('name', 'description', description);
    upsertMeta('name', 'author', SITE_NAME);
    upsertMeta('name', 'robots', noindex ? 'noindex, nofollow' : 'index, follow');

    upsertMeta('property', 'og:type', 'website');
    upsertMeta('property', 'og:site_name', SITE_NAME);
    upsertMeta('property', 'og:title', fullTitle);
    upsertMeta('property', 'og:description', description);
    upsertMeta('property', 'og:url', canonical);
    upsertMeta('property', 'og:image', ogImage);
    upsertMeta('property', 'og:locale', 'en_IN');

    upsertMeta('name', 'twitter:card', 'summary_large_image');
    upsertMeta('name', 'twitter:title', fullTitle);
    upsertMeta('name', 'twitter:description', description);
    upsertMeta('name', 'twitter:image', ogImage);

    upsertLink('canonical', canonical);

    if (path === '/') {
      upsertJsonLd('schema-jewellery-store', {
        '@context': 'https://schema.org',
        '@type': 'JewelryStore',
        name: SITE_NAME,
        url: siteUrl,
        description,
        image: ogImage,
      });
    } else {
      const el = document.getElementById('schema-jewellery-store');
      if (el) el.remove();
    }
  }, [fullTitle, description, canonical, noindex, ogImage, path, siteUrl]);

  return null;
}
