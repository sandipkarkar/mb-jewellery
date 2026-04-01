import { Link } from 'react-router';
import { motion } from 'motion/react';
import { Trash2, Plus, Minus, ShoppingBag, Heart, MessageCircle } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { Button } from '../components/ui/button';
import { whatsappUrl } from '../../utils/whatsapp';
import { buildCartOrderWhatsAppMessage } from '../../utils/orderWhatsApp';

export function Cart() {
  const { cart, removeFromCart, updateQuantity, cartTotal } = useCart();
  const cartWhatsAppHref = whatsappUrl(buildCartOrderWhatsAppMessage(cart, cartTotal));

  if (cart.length === 0) {
    return (
      <div className="min-h-screen py-8 sm:py-12 px-3 sm:px-4 overflow-x-hidden">
        <div className="container mx-auto max-w-4xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-muted mb-6">
              <ShoppingBag className="h-12 w-12 text-muted-foreground" />
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold mb-4">Your Cart is Empty</h1>
            <p className="text-muted-foreground mb-8">
              Looks like you haven't added any items to your cart yet.
            </p>
            <Link to="/products">
              <Button size="lg">
                Continue Shopping
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
        <h1 className="text-2xl sm:text-3xl font-bold mb-6 sm:mb-8">Shopping Cart</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {cart.map((item, index) => (
              <motion.div
                key={`${item.id}-${item.selectedMetal}-${item.selectedPurity}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                className="bg-card rounded-lg border p-4 md:p-6"
              >
                <div className="flex gap-4">
                  {/* Image */}
                  <div className="w-24 h-24 md:w-32 md:h-32 rounded-lg overflow-hidden flex-shrink-0">
                    <img
                      src={item.images[0]}
                      alt={item.name}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  {/* Details */}
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between gap-4 mb-2">
                      <div className="flex-1">
                        <Link to={`/products/${item.id}`} className="hover:text-primary">
                          <h3 className="font-semibold text-base sm:text-lg mb-1 line-clamp-2">{item.name}</h3>
                        </Link>
                        <p className="text-sm text-muted-foreground">
                          {item.selectedMetal} • {item.selectedPurity}
                        </p>
                      </div>
                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="text-muted-foreground hover:text-destructive transition-colors"
                      >
                        <Trash2 className="h-5 w-5" />
                      </button>
                    </div>

                    <div className="flex items-center justify-between mt-4">
                      {/* Quantity */}
                      <div className="flex items-center gap-2 border rounded-lg">
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="p-2 hover:bg-accent rounded-l-lg transition-colors"
                          disabled={item.quantity <= 1}
                        >
                          <Minus className="h-4 w-4" />
                        </button>
                        <span className="w-12 text-center font-medium">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="p-2 hover:bg-accent rounded-r-lg transition-colors"
                        >
                          <Plus className="h-4 w-4" />
                        </button>
                      </div>

                      {/* Price */}
                      <div className="text-right">
                        <p className="text-xl font-bold">
                          ₹{(item.price * item.quantity).toLocaleString()}
                        </p>
                        {item.quantity > 1 && (
                          <p className="text-sm text-muted-foreground">
                            ₹{item.price.toLocaleString()} each
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-card rounded-lg border p-4 sm:p-6 lg:sticky lg:top-20 xl:top-24"
            >
              <h2 className="text-xl font-bold mb-6">Summary</h2>

              <div className="space-y-4 mb-6">
                <div className="flex justify-between text-lg">
                  <span className="font-bold">Subtotal (listed)</span>
                  <span className="font-bold">₹{cartTotal.toLocaleString()}</span>
                </div>
                <p className="text-sm text-muted-foreground">
                  Final pricing, delivery, and payment are confirmed with us on WhatsApp.
                </p>
              </div>

              <Button className="w-full mb-3 bg-[#25D366] text-white hover:bg-[#20BD5A]" size="lg" asChild>
                <a href={cartWhatsAppHref} target="_blank" rel="noopener noreferrer">
                  <MessageCircle className="mr-2 h-5 w-5" />
                  Order on WhatsApp
                </a>
              </Button>

              <Link to="/products">
                <Button variant="outline" className="w-full">
                  Continue Shopping
                </Button>
              </Link>

              {/* Trust Badges */}
              <div className="mt-6 pt-6 border-t space-y-3 text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                  <Heart className="h-4 w-4" />
                  <span>100% Certified Diamonds</span>
                </div>
                <div className="flex items-center gap-2">
                  <ShoppingBag className="h-4 w-4" />
                  <span>7-Day Easy Returns</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
