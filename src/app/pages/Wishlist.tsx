import { Link } from 'react-router';
import { motion } from 'motion/react';
import { Heart, ShoppingCart, Trash2 } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { Button } from '../components/ui/button';
import type { Product } from '../../data/products';

export function Wishlist() {
  const { wishlist, removeFromWishlist, addToCart } = useCart();

  const handleMoveToCart = (product: Product) => {
    addToCart(product, product.metalColors[0], product.purities[0], 1);
    removeFromWishlist(product.id);
  };

  if (wishlist.length === 0) {
    return (
      <div className="min-h-screen py-8 sm:py-12 px-3 sm:px-4 overflow-x-hidden">
        <div className="container mx-auto max-w-4xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-muted mb-6">
              <Heart className="h-12 w-12 text-muted-foreground" />
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold mb-4">Your Wishlist is Empty</h1>
            <p className="text-muted-foreground mb-8">
              Save your favorite items to your wishlist and shop them later.
            </p>
            <Link to="/products">
              <Button size="lg">
                Explore Products
              </Button>
            </Link>
          </motion.div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-8 sm:py-12 px-3 sm:px-4 overflow-x-hidden">
      <div className="container mx-auto max-w-7xl">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between mb-6 sm:mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold">My Wishlist</h1>
          <p className="text-sm sm:text-base text-muted-foreground">{wishlist.length} items</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {wishlist.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              className="bg-card rounded-lg border overflow-hidden group"
            >
              {/* Image */}
              <div className="relative aspect-square overflow-hidden bg-muted">
                <Link to={`/products/${product.id}`}>
                  <img
                    src={product.images[0]}
                    alt={product.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                </Link>
                <button
                  onClick={() => removeFromWishlist(product.id)}
                  className="absolute top-3 right-3 p-2 bg-white dark:bg-gray-900 rounded-full shadow-lg hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
                >
                  <Trash2 className="h-4 w-4 text-red-600" />
                </button>
              </div>

              {/* Details */}
              <div className="p-4">
                <Link to={`/products/${product.id}`} className="hover:text-primary">
                  <h3 className="font-semibold mb-1 line-clamp-2">{product.name}</h3>
                </Link>
                <p className="text-sm text-muted-foreground mb-3">{product.category}</p>
                <p className="text-xl font-bold mb-4">₹{product.price.toLocaleString()}</p>

                <Button
                  className="w-full"
                  onClick={() => handleMoveToCart(product)}
                >
                  <ShoppingCart className="mr-2 h-4 w-4" />
                  Move to Cart
                </Button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
