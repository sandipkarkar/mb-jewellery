import { Outlet, ScrollRestoration, useLocation } from 'react-router';
import { Header } from './Header';
import { Footer } from './Footer';
import { Toaster } from './ui/sonner';
import { Seo } from './Seo';
import { getLayoutSeo } from '../../config/pageSeo';

function LayoutSeo() {
  const { pathname } = useLocation();
  const isProductDetail = /^\/products\/[^/]+$/.test(pathname);
  if (isProductDetail) return null;

  const cfg = getLayoutSeo(pathname);
  if (!cfg) return null;

  return (
    <Seo
      title={cfg.title}
      description={cfg.description}
      canonicalPath={pathname}
      noindex={cfg.noindex}
    />
  );
}

export function Layout() {
  return (
    <div className="min-h-screen flex flex-col overflow-x-hidden">
      <ScrollRestoration />
      <LayoutSeo />
      <Header />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
      <Toaster />
    </div>
  );
}