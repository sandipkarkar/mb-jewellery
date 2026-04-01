import { RouterProvider } from 'react-router';
import { ThemeProvider } from 'next-themes';
import { router } from './routes';
import { CartProvider } from './context/CartContext';
import { ProductsProvider } from './context/ProductsContext';
import { CategoriesProvider } from './context/CategoriesContext';

export default function App() {
  return (
    <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
      <CategoriesProvider>
        <ProductsProvider>
          <CartProvider>
            <RouterProvider router={router} />
          </CartProvider>
        </ProductsProvider>
      </CategoriesProvider>
    </ThemeProvider>
  );
}