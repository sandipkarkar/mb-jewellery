import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  ReactNode,
} from "react";
import { Product, products as seedProducts } from "../../data/products";

type ProductsContextType = {
  products: Product[];
  setProducts: (next: Product[]) => void;
  addProduct: (product: Product) => void;
  updateProduct: (product: Product) => void;
  deleteProduct: (productId: string) => void;
  getProductById: (productId: string) => Product | undefined;
  resetToSeed: () => void;
};

const PRODUCTS_STORAGE_KEY = "products";

const ProductsContext = createContext<ProductsContextType | undefined>(undefined);

function safeParseProducts(value: string | null): Product[] | null {
  if (!value) return null;
  try {
    const parsed = JSON.parse(value) as unknown;
    if (!Array.isArray(parsed)) return null;
    return parsed as Product[];
  } catch {
    return null;
  }
}

export function ProductsProvider({ children }: { children: ReactNode }) {
  const [products, setProductsState] = useState<Product[]>(() => {
    const saved = safeParseProducts(localStorage.getItem(PRODUCTS_STORAGE_KEY));
    return saved && saved.length > 0 ? saved : seedProducts;
  });

  useEffect(() => {
    localStorage.setItem(PRODUCTS_STORAGE_KEY, JSON.stringify(products));
  }, [products]);

  const value = useMemo<ProductsContextType>(() => {
    const setProducts = (next: Product[]) => setProductsState(next);

    const addProduct = (product: Product) => {
      setProductsState((prev) => {
        const exists = prev.some((p) => p.id === product.id);
        if (exists) {
          return prev.map((p) => (p.id === product.id ? product : p));
        }
        return [product, ...prev];
      });
    };

    const updateProduct = (product: Product) => {
      setProductsState((prev) =>
        prev.map((p) => (p.id === product.id ? product : p)),
      );
    };

    const deleteProduct = (productId: string) => {
      setProductsState((prev) => prev.filter((p) => p.id !== productId));
    };

    const getProductById = (productId: string) =>
      products.find((p) => p.id === productId);

    const resetToSeed = () => setProductsState(seedProducts);

    return {
      products,
      setProducts,
      addProduct,
      updateProduct,
      deleteProduct,
      getProductById,
      resetToSeed,
    };
  }, [products]);

  return (
    <ProductsContext.Provider value={value}>{children}</ProductsContext.Provider>
  );
}

export function useProducts() {
  const context = useContext(ProductsContext);
  if (!context) {
    throw new Error("useProducts must be used within ProductsProvider");
  }
  return context;
}

