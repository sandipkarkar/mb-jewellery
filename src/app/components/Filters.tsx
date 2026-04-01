import { useState } from 'react';
import * as Slider from '@radix-ui/react-slider';
import { Star } from 'lucide-react';
import { useCategories } from '../context/CategoriesContext';

interface FiltersProps {
  onFilterChange: (filters: FilterState) => void;
}

export interface FilterState {
  category: string;
  priceRange: [number, number];
  metalColor: string;
  purity: string;
  rating: number;
}

const metalColors = ['All', 'White Gold', 'Yellow Gold', 'Rose Gold'];
const purities = ['All', '10K', '14K', '18K', '925 Silver'];

export function Filters({ onFilterChange }: FiltersProps) {
  const { categories } = useCategories();
  const categoryOptions = ['All', ...categories.map((c) => c.name)];
  const [filters, setFilters] = useState<FilterState>({
    category: 'All',
    priceRange: [0, 100000],
    metalColor: 'All',
    purity: 'All',
    rating: 0,
  });

  const updateFilter = <K extends keyof FilterState>(key: K, value: FilterState[K]) => {
    const newFilters = { ...filters, [key]: value };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="font-semibold mb-3">Category</h3>
        <div className="space-y-2">
          {categoryOptions.map((cat) => (
            <label key={cat} className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                name="category"
                checked={filters.category === cat}
                onChange={() => updateFilter('category', cat)}
                className="h-4 w-4 accent-primary"
              />
              <span className="text-sm">{cat}</span>
            </label>
          ))}
        </div>
      </div>

      <div className="pt-6 border-t">
        <h3 className="font-semibold mb-4">Price Range</h3>
        <Slider.Root
          className="relative flex items-center select-none touch-none w-full h-5"
          value={filters.priceRange}
          onValueChange={(value) => updateFilter('priceRange', value as [number, number])}
          max={100000}
          step={1000}
          minStepsBetweenThumbs={1}
        >
          <Slider.Track className="bg-muted relative grow rounded-full h-1">
            <Slider.Range className="absolute bg-primary rounded-full h-full" />
          </Slider.Track>
          <Slider.Thumb className="block w-4 h-4 bg-background border-2 border-primary rounded-full hover:bg-accent focus:outline-none focus:ring-2 focus:ring-primary" />
          <Slider.Thumb className="block w-4 h-4 bg-background border-2 border-primary rounded-full hover:bg-accent focus:outline-none focus:ring-2 focus:ring-primary" />
        </Slider.Root>
        <div className="flex justify-between mt-2 text-sm text-muted-foreground">
          <span>₹{filters.priceRange[0].toLocaleString('en-IN')}</span>
          <span>₹{filters.priceRange[1].toLocaleString('en-IN')}</span>
        </div>
      </div>

      <div className="pt-6 border-t">
        <h3 className="font-semibold mb-3">Metal Color</h3>
        <div className="space-y-2">
          {metalColors.map((color) => (
            <label key={color} className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                name="metalColor"
                checked={filters.metalColor === color}
                onChange={() => updateFilter('metalColor', color)}
                className="h-4 w-4 accent-primary"
              />
              <span className="text-sm">{color}</span>
            </label>
          ))}
        </div>
      </div>

      <div className="pt-6 border-t">
        <h3 className="font-semibold mb-3">Purity</h3>
        <div className="space-y-2">
          {purities.map((purity) => (
            <label key={purity} className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                name="purity"
                checked={filters.purity === purity}
                onChange={() => updateFilter('purity', purity)}
                className="h-4 w-4 accent-primary"
              />
              <span className="text-sm">{purity}</span>
            </label>
          ))}
        </div>
      </div>

      <div className="pt-6 border-t">
        <h3 className="font-semibold mb-3">Minimum Rating</h3>
        <div className="space-y-2">
          {[0, 3, 4, 4.5].map((rating) => (
            <label key={rating} className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                name="rating"
                checked={filters.rating === rating}
                onChange={() => updateFilter('rating', rating)}
                className="h-4 w-4 accent-primary"
              />
              <span className="text-sm flex items-center gap-1">
                {rating === 0 ? 'All' : (
                  <>
                    {rating}
                    <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                    & up
                  </>
                )}
              </span>
            </label>
          ))}
        </div>
      </div>

      <button
        onClick={() => {
          const resetFilters: FilterState = {
            category: 'All',
            priceRange: [0, 100000],
            metalColor: 'All',
            purity: 'All',
            rating: 0,
          };
          setFilters(resetFilters);
          onFilterChange(resetFilters);
        }}
        className="w-full py-2 px-4 border rounded-lg hover:bg-accent transition-colors text-sm font-medium"
      >
        Clear All Filters
      </button>
    </div>
  );
}
