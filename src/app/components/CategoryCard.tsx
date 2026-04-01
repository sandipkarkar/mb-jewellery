import { Link } from 'react-router';
import { ImageWithFallback } from './ImageWithFallback';

interface CategoryCardProps {
  name: string;
  image: string;
}

export function CategoryCard({ name, image }: CategoryCardProps) {
  return (
    <Link
      to={`/products?category=${name}`}
      className="group block relative rounded-lg overflow-hidden transition-all hover:shadow-lg"
    >
      <div className="aspect-square overflow-hidden bg-muted">
        <ImageWithFallback
          src={image}
          alt={name}
          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-110"
        />
      </div>
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end">
        <div className="p-2.5 sm:p-4 w-full">
          <h3 className="text-white font-semibold text-sm sm:text-base md:text-lg leading-tight">{name}</h3>
        </div>
      </div>
    </Link>
  );
}
