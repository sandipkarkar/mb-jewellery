import { Link } from 'react-router';
import { Heart, ShoppingCart, Menu, Moon, Sun, User } from 'lucide-react';
import { useTheme } from 'next-themes';
import { useState, useEffect } from 'react';
import { useCart } from '../context/CartContext';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from './ui/dropdown-menu';
import logo from '../../assets/Logo.svg';

export function Header() {
  const { theme, setTheme } = useTheme();
  const { cartItemsCount, wishlist } = useCart();
  const [mounted, setMounted] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    setMounted(true);
    setIsAuthenticated(localStorage.getItem('isAuthenticated') === 'true');
  }, []);

  return (
    <header className="sticky top-0 z-50 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-3 sm:px-4">
        <div className="flex h-16 md:h-20 items-center justify-between gap-2">
          {/* Logo */}
          <Link to="/" className="flex items-center min-w-0 shrink">
            <img
              src={logo}
              alt="Logo"
              className="h-12 sm:h-14 md:h-16 w-auto object-contain"
              loading="eager"
              decoding="async"
            />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-3 lg:gap-5 xl:gap-6">
            <Link to="/" className="text-xs lg:text-sm font-medium transition-colors hover:text-primary whitespace-nowrap">
              Home
            </Link>
            <Link to="/products" className="text-xs lg:text-sm font-medium transition-colors hover:text-primary whitespace-nowrap">
              Products
            </Link>
            <Link to="/ask-price" className="text-xs lg:text-sm font-medium transition-colors hover:text-primary whitespace-nowrap">
              Ask Price
            </Link>
            <Link to="/about" className="text-xs lg:text-sm font-medium transition-colors hover:text-primary whitespace-nowrap">
              About
            </Link>
            <Link to="/contact" className="text-xs lg:text-sm font-medium transition-colors hover:text-primary whitespace-nowrap">
              Contact
            </Link>
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-1 sm:gap-2 md:gap-3 shrink-0">
            <Link to="/wishlist" className="rounded-full p-2 hover:bg-accent transition-colors relative">
              <Heart className="h-5 w-5" />
              {wishlist.length > 0 && (
                <span className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-primary text-xs text-primary-foreground flex items-center justify-center">
                  {wishlist.length}
                </span>
              )}
            </Link>
            <Link to="/cart" className="rounded-full p-2 hover:bg-accent transition-colors relative">
              <ShoppingCart className="h-5 w-5" />
              {cartItemsCount > 0 && (
                <span className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-primary text-xs text-primary-foreground flex items-center justify-center">
                  {cartItemsCount}
                </span>
              )}
            </Link>
            
            {/* User Menu */}
            {isAuthenticated ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <button className="rounded-full p-2 hover:bg-accent transition-colors">
                    <User className="h-5 w-5" />
                  </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-48">
                  <DropdownMenuItem asChild>
                    <Link to="/account" className="cursor-pointer">My Account</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link to="/wishlist" className="cursor-pointer">Wishlist</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link to="/addresses" className="cursor-pointer">Addresses</Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem
                    onClick={() => {
                      localStorage.removeItem('isAuthenticated');
                      window.location.href = '/';
                    }}
                    className="cursor-pointer text-red-600"
                  >
                    Sign Out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Link to="/login" className="rounded-full p-2 hover:bg-accent transition-colors">
                <User className="h-5 w-5" />
              </Link>
            )}

            {mounted && (
              <button
                onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                className="rounded-full p-2 hover:bg-accent transition-colors"
              >
                {theme === 'dark' ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
              </button>
            )}
            <button
              type="button"
              className="md:hidden rounded-full p-2 hover:bg-accent transition-colors"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-expanded={mobileMenuOpen}
              aria-label="Open menu"
            >
              <Menu className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <nav className="md:hidden py-3 px-1 space-y-1 border-t max-h-[min(70vh,24rem)] overflow-y-auto overscroll-contain">
            <Link
              to="/"
              className="block py-2 text-sm font-medium transition-colors hover:text-primary"
              onClick={() => setMobileMenuOpen(false)}
            >
              Home
            </Link>
            <Link
              to="/products"
              className="block py-2 text-sm font-medium transition-colors hover:text-primary"
              onClick={() => setMobileMenuOpen(false)}
            >
              Products
            </Link>
            <Link
              to="/ask-price"
              className="block py-2 text-sm font-medium transition-colors hover:text-primary"
              onClick={() => setMobileMenuOpen(false)}
            >
              Ask Price
            </Link>
            <Link
              to="/about"
              className="block py-2 text-sm font-medium transition-colors hover:text-primary"
              onClick={() => setMobileMenuOpen(false)}
            >
              About
            </Link>
            <Link
              to="/contact"
              className="block py-2 text-sm font-medium transition-colors hover:text-primary"
              onClick={() => setMobileMenuOpen(false)}
            >
              Contact
            </Link>
            {!isAuthenticated && (
              <Link
                to="/login"
                className="block py-2 text-sm font-medium transition-colors hover:text-primary"
                onClick={() => setMobileMenuOpen(false)}
              >
                Sign In
              </Link>
            )}
          </nav>
        )}
      </div>
    </header>
  );
}