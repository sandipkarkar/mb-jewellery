import { Link } from 'react-router';
import { Heart, Eye, Star } from 'lucide-react';
import { Product } from '../../data/products';
import { ImageWithFallback } from './ImageWithFallback';

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  return (
    <div className="group relative rounded-lg border bg-card overflow-hidden transition-all hover:shadow-lg">
      {/* Image */}
      <Link to={`/products/${product.id}`} className="block relative aspect-square overflow-hidden bg-muted">
        <ImageWithFallback
          src={product.images[0]}
          alt={product.name}
          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
        
        {/* Wishlist Button */}
        <button className="absolute top-3 right-3 rounded-full p-2 bg-background/80 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity hover:bg-background">
          <Heart className="h-4 w-4" />
        </button>

        {/* Quick View Button */}
        <button className="absolute bottom-3 left-1/2 -translate-x-1/2 px-4 py-2 bg-background/80 backdrop-blur-sm rounded-full text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-2 hover:bg-background">
          <Eye className="h-4 w-4" />
          Quick View
        </button>
      </Link>

      {/* Content */}
      <div className="p-4 space-y-2">
        <div className="flex items-center justify-between text-xs text-muted-foreground">
          <span>{product.id}</span>
          <div className="flex items-center gap-1">
            <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
            <span>{product.rating}</span>
          </div>
        </div>
        
        <Link to={`/products/${product.id}`}>
          <h3 className="font-medium line-clamp-1 hover:text-primary transition-colors">
            {product.name}
          </h3>
        </Link>
        
        <div className="flex items-center justify-between">
          <p className="text-base sm:text-lg font-semibold tabular-nums">₹{product.price.toLocaleString('en-IN')}</p>
          <span className="text-xs text-muted-foreground">{product.reviews} reviews</span>
        </div>
      </div>
    </div>
  );
}