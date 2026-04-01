import { Link, useLocation } from 'react-router';
import { Home } from 'lucide-react';
import { Seo } from '../components/Seo';

export function NotFound() {
  const { pathname } = useLocation();

  return (
    <>
      <Seo
        title="Page not found"
        description="The page you requested could not be found on M B Brother Gems And Jewellery."
        canonicalPath={pathname}
        noindex
      />
    <div className="min-h-screen flex items-center justify-center px-3 sm:px-4 py-8 overflow-x-hidden">
      <div className="text-center space-y-4 sm:space-y-6 max-w-md mx-auto">
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-primary tabular-nums">404</h1>
        <h2 className="text-xl sm:text-2xl font-semibold">Page Not Found</h2>
        <p className="text-sm sm:text-base text-muted-foreground px-2">
          Sorry, we couldn't find the page you're looking for. It might have been moved or deleted.
        </p>
        <Link
          to="/"
          className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-lg font-semibold hover:bg-primary/90 transition-colors"
        >
          <Home className="h-5 w-5" />
          Back to Home
        </Link>
      </div>
    </div>
    </>
  );
}
