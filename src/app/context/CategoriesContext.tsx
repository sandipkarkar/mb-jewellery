import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  ReactNode,
} from "react";
import { categories as seedCategories } from "../../data/products";

export type Category = {
  name: string;
  image: string;
};

type CategoriesContextType = {
  categories: Category[];
  setCategories: (next: Category[]) => void;
  addCategory: (category: Category) => void;
  updateCategory: (category: Category) => void;
  deleteCategory: (categoryName: string) => void;
  getCategoryByName: (categoryName: string) => Category | undefined;
  resetToSeed: () => void;
};

const CATEGORIES_STORAGE_KEY = "categories";

const CategoriesContext = createContext<CategoriesContextType | undefined>(
  undefined,
);

function safeParseCategories(value: string | null): Category[] | null {
  if (!value) return null;
  try {
    const parsed = JSON.parse(value) as unknown;
    if (!Array.isArray(parsed)) return null;
    return parsed as Category[];
  } catch {
    return null;
  }
}

export function CategoriesProvider({ children }: { children: ReactNode }) {
  const [categories, setCategoriesState] = useState<Category[]>(() => {
    const saved = safeParseCategories(
      localStorage.getItem(CATEGORIES_STORAGE_KEY),
    );
    return saved && saved.length > 0 ? saved : (seedCategories as Category[]);
  });

  useEffect(() => {
    localStorage.setItem(CATEGORIES_STORAGE_KEY, JSON.stringify(categories));
  }, [categories]);

  const value = useMemo<CategoriesContextType>(() => {
    const setCategories = (next: Category[]) => setCategoriesState(next);

    const addCategory = (category: Category) => {
      setCategoriesState((prev) => {
        const exists = prev.some(
          (c) => c.name.toLowerCase() === category.name.toLowerCase(),
        );
        if (exists) {
          return prev.map((c) =>
            c.name.toLowerCase() === category.name.toLowerCase() ? category : c,
          );
        }
        return [category, ...prev];
      });
    };

    const updateCategory = (category: Category) => {
      setCategoriesState((prev) =>
        prev.map((c) =>
          c.name.toLowerCase() === category.name.toLowerCase() ? category : c,
        ),
      );
    };

    const deleteCategory = (categoryName: string) => {
      setCategoriesState((prev) =>
        prev.filter((c) => c.name.toLowerCase() !== categoryName.toLowerCase()),
      );
    };

    const getCategoryByName = (categoryName: string) =>
      categories.find(
        (c) => c.name.toLowerCase() === categoryName.toLowerCase(),
      );

    const resetToSeed = () => setCategoriesState(seedCategories as Category[]);

    return {
      categories,
      setCategories,
      addCategory,
      updateCategory,
      deleteCategory,
      getCategoryByName,
      resetToSeed,
    };
  }, [categories]);

  return (
    <CategoriesContext.Provider value={value}>
      {children}
    </CategoriesContext.Provider>
  );
}

export function useCategories() {
  const context = useContext(CategoriesContext);
  if (!context) {
    throw new Error("useCategories must be used within CategoriesProvider");
  }
  return context;
}

