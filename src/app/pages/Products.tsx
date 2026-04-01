import { useState, useEffect } from "react";
import { useSearchParams } from "react-router";
import { SlidersHorizontal } from "lucide-react";
import { Filters, FilterState } from "../components/Filters";
import { ProductCard } from "../components/ProductCard";
import { PAGE_CONTAINER, PAGE_VERTICAL_PADDING } from "../../config/layout";
import { useProducts } from "../context/ProductsContext";

export function Products() {
  const [searchParams] = useSearchParams();
  const [showFilters, setShowFilters] = useState(false);
  const [sortBy, setSortBy] = useState("popular");
  const { products } = useProducts();
  const [filters, setFilters] = useState<FilterState>({
    category: searchParams.get("category") || "All",
    priceRange: [0, 100000],
    metalColor: "All",
    purity: "All",
    rating: 0,
  });

  useEffect(() => {
    const category = searchParams.get("category");
    if (category) {
      setFilters((prev) => ({ ...prev, category }));
    }
  }, [searchParams]);

  // Filter products
  let filteredProducts = products.filter((product) => {
    // Category filter
    if (filters.category !== "All" && product.category !== filters.category) {
      return false;
    }

    // Price filter
    if (
      product.price < filters.priceRange[0] ||
      product.price > filters.priceRange[1]
    ) {
      return false;
    }

    // Metal color filter
    if (filters.metalColor !== "All") {
      const metalColorMatch = product.metalColors.some((color) =>
        color.toLowerCase().includes(filters.metalColor.toLowerCase()),
      );
      if (!metalColorMatch) return false;
    }

    // Purity filter
    if (
      filters.purity !== "All" &&
      !product.purities.includes(filters.purity)
    ) {
      return false;
    }

    // Rating filter
    if (product.rating < filters.rating) {
      return false;
    }

    return true;
  });

  // Sort products
  filteredProducts = [...filteredProducts].sort((a, b) => {
    switch (sortBy) {
      case "price-low":
        return a.price - b.price;
      case "price-high":
        return b.price - a.price;
      case "newest":
        return b.id.localeCompare(a.id);
      case "popular":
      default:
        return b.reviews - a.reviews;
    }
  });

  return (
    <div className="min-h-screen overflow-x-hidden">
      <div className={`${PAGE_CONTAINER} ${PAGE_VERTICAL_PADDING}`}>
        {/* Header */}
        <div className="mb-6 sm:mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold mb-3 sm:mb-4">
            {filters.category === "All" ? "All Products" : filters.category}
          </h1>
          <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="lg:hidden flex items-center gap-2 px-4 py-2 border rounded-lg hover:bg-accent transition-colors"
            >
              <SlidersHorizontal className="h-4 w-4" />
              Filters
            </button>

            <div className="flex flex-col sm:flex-row sm:items-center gap-2 w-full sm:w-auto min-w-0">
              <label className="text-xs sm:text-sm font-medium shrink-0 pt-1 sm:pt-0">
                Sort by:
              </label>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-3 sm:px-4 py-2 border rounded-lg bg-background text-sm w-full sm:w-auto sm:min-w-[180px] max-w-full"
              >
                <option value="popular">Most Popular</option>
                <option value="newest">New Arrivals</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
              </select>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="grid lg:grid-cols-4 gap-6 lg:gap-8 min-w-0">
          {/* Filters Sidebar */}
          <aside
            className={`min-w-0 lg:block ${showFilters ? "block" : "hidden"} lg:col-span-1`}
          >
            <div className="lg:sticky lg:top-20 p-4 sm:p-6 border rounded-lg bg-card max-h-[70vh] lg:max-h-none overflow-y-auto overscroll-contain">
              <h2 className="font-semibold text-base sm:text-lg mb-4 sm:mb-6">
                Filters
              </h2>
              <Filters onFilterChange={setFilters} />
            </div>
          </aside>

          {/* Products Grid */}
          <div className="min-w-0 lg:col-span-3">
            <div className="mb-4 text-sm text-muted-foreground">
              Showing {filteredProducts.length} products
            </div>

            {filteredProducts.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                {filteredProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            ) : (
              <div className="text-center py-16">
                <p className="text-lg text-muted-foreground">
                  No products found matching your criteria.
                </p>
                <button
                  onClick={() => {
                    setFilters({
                      category: "All",
                      priceRange: [0, 100000],
                      metalColor: "All",
                      purity: "All",
                      rating: 0,
                    });
                  }}
                  className="mt-4 px-6 py-2 border rounded-lg hover:bg-accent transition-colors"
                >
                  Clear Filters
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
