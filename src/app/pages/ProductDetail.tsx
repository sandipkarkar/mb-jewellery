import { useMemo, useState } from "react";
import { useParams, Link, useLocation } from "react-router";
import { motion } from "motion/react";
import {
  Heart,
  Share2,
  ShoppingCart,
  Star,
  Award,
  RotateCcw,
  Truck,
  Shield,
  Gem,
  Package,
  Sparkles,
  CheckCircle2,
  Info,
  MessageCircle,
} from "lucide-react";
import { ProductSlider } from "../components/ProductSlider";
import { ProductCard } from "../components/ProductCard";
import { useCart } from "../context/CartContext";
import { toast } from "sonner";
import { Button } from "../components/ui/button";
import { whatsappUrl } from "../../utils/whatsapp";
import { buildProductOrderWhatsAppMessage } from "../../utils/orderWhatsApp";
import { truncateMetaDescription } from "../../config/pageSeo";
import { Seo } from "../components/Seo";
import { PAGE_CONTAINER, PAGE_VERTICAL_PADDING } from "../../config/layout";
import { useProducts } from "../context/ProductsContext";

export function ProductDetail() {
  const { id } = useParams();
  const { pathname } = useLocation();
  const { products } = useProducts();
  const product = products.find((p) => p.id === id);
  const { addToCart, addToWishlist, isInWishlist, removeFromWishlist } =
    useCart();

  const [selectedMetal, setSelectedMetal] = useState(
    product?.metalColors[0] || "",
  );
  const [selectedPurity, setSelectedPurity] = useState(
    product?.purities[0] || "",
  );
  const [selectedSize, setSelectedSize] = useState("7");
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState<
    "specifications" | "care" | "shipping"
  >("specifications");

  const whatsappMessage = useMemo(() => {
    if (!product) return "";
    return buildProductOrderWhatsAppMessage({
      product,
      selectedMetal,
      selectedPurity,
      quantity,
      ringSize: product.category === "Rings" ? selectedSize : undefined,
    });
  }, [product, selectedMetal, selectedPurity, quantity, selectedSize]);

  const whatsappHref = whatsappMessage ? whatsappUrl(whatsappMessage) : "";

  if (!product) {
    return (
      <>
        <Seo
          title="Product not found"
          description="The jewellery product you are looking for is not available or may have been removed."
          canonicalPath={pathname}
          noindex
        />
        <div className="min-h-screen overflow-x-hidden flex items-center justify-center">
          <div className={`${PAGE_CONTAINER} py-12 sm:py-16 md:py-20`}>
            <div className="text-center max-w-md mx-auto">
              <h1 className="text-xl sm:text-2xl font-bold mb-4">
                Product Not Found
              </h1>
              <Link to="/products" className="text-primary hover:underline">
                Browse all products
              </Link>
            </div>
          </div>
        </div>
      </>
    );
  }

  const handleAddToCart = () => {
    addToCart(product, selectedMetal, selectedPurity, quantity);
    toast.success(`${product.name} added to cart!`);
  };

  const handleToggleWishlist = () => {
    if (isInWishlist(product.id)) {
      removeFromWishlist(product.id);
      toast.success("Removed from wishlist");
    } else {
      addToWishlist(product);
      toast.success("Added to wishlist");
    }
  };

  const relatedProducts = products
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, 4);

  return (
    <>
      <Seo
        title={product.name}
        description={truncateMetaDescription(product.description)}
        canonicalPath={`/products/${product.id}`}
        image={product.images[0]}
      />
      <div className="min-h-screen bg-gradient-to-b from-background to-muted/20 overflow-x-hidden">
        <div className={`${PAGE_CONTAINER} ${PAGE_VERTICAL_PADDING}`}>
          {/* Breadcrumb - Enhanced */}
          <motion.nav
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-6 sm:mb-8 text-xs sm:text-sm text-muted-foreground"
          >
            <div className="flex items-center gap-1.5 sm:gap-2 flex-wrap">
              <Link to="/" className="hover:text-foreground transition-colors">
                Home
              </Link>
              <span>/</span>
              <Link
                to="/products"
                className="hover:text-foreground transition-colors"
              >
                Products
              </Link>
              <span>/</span>
              <Link
                to={`/products?category=${product.category}`}
                className="hover:text-foreground transition-colors"
              >
                {product.category}
              </Link>
              <span>/</span>
              <span className="text-foreground font-medium line-clamp-2 sm:line-clamp-none break-words max-w-full">
                {product.name}
              </span>
            </div>
          </motion.nav>

          {/* Product Details - Premium Layout */}
          <div className="grid lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-12 xl:gap-16 mb-12 sm:mb-16 md:mb-20 min-w-0">
            {/* Image Slider - Left */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="min-w-0"
            >
              <div className="lg:sticky lg:top-20 xl:top-24">
                <ProductSlider
                  images={product.images}
                  productName={product.name}
                />
              </div>
            </motion.div>

            {/* Product Info - Right */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="min-w-0 space-y-8"
            >
              {/* Header */}
              <div className="space-y-4">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <p className="text-sm font-medium text-primary mb-2">
                      {product.id}
                    </p>
                    <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-4xl font-bold mb-3 sm:mb-4 leading-tight">
                      {product.name}
                    </h1>
                  </div>
                  <button
                    onClick={handleToggleWishlist}
                    className={`p-3 rounded-full border transition-all hover:scale-110 ${
                      isInWishlist(product.id)
                        ? "bg-red-50 dark:bg-red-900/20 border-red-500"
                        : "hover:bg-accent"
                    }`}
                  >
                    <Heart
                      className={`h-6 w-6 ${isInWishlist(product.id) ? "fill-red-500 text-red-500" : ""}`}
                    />
                  </button>
                </div>

                {/* Rating */}
                <div className="flex items-center gap-4 pb-4 border-b">
                  <div className="flex items-center gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`h-5 w-5 ${
                          i < Math.floor(product.rating)
                            ? "fill-yellow-400 text-yellow-400"
                            : "text-muted-foreground"
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-sm font-medium">
                    {product.rating} ({product.reviews} reviews)
                  </span>
                </div>

                {/* Price */}
                <div className="py-4 border-b">
                  <div className="flex items-baseline gap-3">
                    <p className="text-2xl sm:text-3xl md:text-4xl font-bold text-primary tabular-nums">
                      ₹{product.price.toLocaleString("en-IN")}
                    </p>
                    <span className="text-sm text-muted-foreground">
                      (Inclusive of all taxes)
                    </span>
                  </div>
                </div>

                {/* Description */}
                <p className="text-lg text-muted-foreground leading-relaxed">
                  {product.description}
                </p>
              </div>

              {/* Key Features */}
              <div className="grid grid-cols-2 gap-4 p-6 rounded-2xl bg-muted/30 border">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-primary/10">
                    <Gem className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">
                      Diamond Type
                    </p>
                    <p className="font-semibold text-sm">
                      {product.specifications.diamondType}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-primary/10">
                    <Award className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">
                      Certification
                    </p>
                    <p className="font-semibold text-sm">IGI/GIA</p>
                  </div>
                </div>
                {product.specifications.caratWeight && (
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-primary/10">
                      <Sparkles className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">
                        Diamond Weight
                      </p>
                      <p className="font-semibold text-sm">
                        {product.specifications.caratWeight}
                      </p>
                    </div>
                  </div>
                )}
                {product.specifications.netWeight && (
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-primary/10">
                      <Package className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">Net Weight</p>
                      <p className="font-semibold text-sm">
                        {product.specifications.netWeight}
                      </p>
                    </div>
                  </div>
                )}
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-primary/10">
                    <Package className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">
                      Gross Weight
                    </p>
                    <p className="font-semibold text-sm">
                      {product.specifications.weight}
                    </p>
                  </div>
                </div>
              </div>

              {/* Metal Color Selection */}
              <div className="space-y-3">
                <label className="block text-sm font-semibold">
                  Metal Color
                </label>
                <div className="flex flex-wrap gap-3">
                  {product.metalColors.map((color) => (
                    <button
                      key={color}
                      onClick={() => setSelectedMetal(color)}
                      className={`px-3 py-2.5 sm:px-5 sm:py-3 text-sm sm:text-base border-2 rounded-xl transition-all font-medium ${
                        selectedMetal === color
                          ? "border-primary bg-primary/10 text-primary"
                          : "border-border hover:border-primary/50 hover:bg-accent"
                      }`}
                    >
                      {color}
                    </button>
                  ))}
                </div>
              </div>

              {/* Purity Selection */}
              <div className="space-y-3">
                <label className="block text-sm font-semibold">Purity</label>
                <div className="flex flex-wrap gap-3">
                  {product.purities.map((purity) => (
                    <button
                      key={purity}
                      onClick={() => setSelectedPurity(purity)}
                      className={`px-3 py-2.5 sm:px-5 sm:py-3 text-sm sm:text-base border-2 rounded-xl transition-all font-medium ${
                        selectedPurity === purity
                          ? "border-primary bg-primary/10 text-primary"
                          : "border-border hover:border-primary/50 hover:bg-accent"
                      }`}
                    >
                      {purity}
                    </button>
                  ))}
                </div>
              </div>

              {/* Ring Size (only for rings) */}
              {product.category === "Rings" && (
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <label className="block text-sm font-semibold">
                      Ring Size
                    </label>
                    <button className="text-xs text-primary hover:underline">
                      Size Guide
                    </button>
                  </div>
                  <select
                    value={selectedSize}
                    onChange={(e) => setSelectedSize(e.target.value)}
                    className="w-full px-4 py-3 border-2 rounded-xl bg-background font-medium hover:border-primary/50 transition-colors cursor-pointer"
                  >
                    {[5, 5.5, 6, 6.5, 7, 7.5, 8, 8.5, 9, 9.5, 10].map(
                      (size) => (
                        <option key={size} value={size}>
                          Size {size}
                        </option>
                      ),
                    )}
                  </select>
                </div>
              )}

              {/* Quantity */}
              <div className="space-y-3">
                <label className="block text-sm font-semibold">Quantity</label>
                <div className="flex items-center gap-4">
                  <div className="flex items-center border-2 rounded-xl overflow-hidden">
                    <button
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="w-12 h-12 hover:bg-accent transition-colors font-semibold text-lg"
                    >
                      -
                    </button>
                    <span className="w-16 text-center font-semibold">
                      {quantity}
                    </span>
                    <button
                      onClick={() => setQuantity(quantity + 1)}
                      className="w-12 h-12 hover:bg-accent transition-colors font-semibold text-lg"
                    >
                      +
                    </button>
                  </div>
                  {quantity > 1 && (
                    <span className="text-sm text-muted-foreground">
                      Total: ₹
                      {(product.price * quantity).toLocaleString("en-IN")}
                    </span>
                  )}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <Button
                  asChild
                  size="lg"
                  className="flex-1 min-h-12 h-12 sm:h-14 text-base sm:text-lg font-semibold rounded-xl bg-[#25D366] text-white hover:bg-[#20BD5A]"
                >
                  <a
                    href={whatsappHref}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <MessageCircle className="mr-2 h-5 w-5" />
                    Order on WhatsApp
                  </a>
                </Button>
                <Button
                  onClick={handleAddToCart}
                  variant="outline"
                  size="lg"
                  className="flex-1 min-h-12 h-12 sm:h-14 text-base sm:text-lg font-semibold rounded-xl sm:flex-initial sm:min-w-[160px]"
                >
                  <ShoppingCart className="mr-2 h-5 w-5" />
                  Add To Cart
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  className="h-12 sm:h-14 px-4 sm:px-6 rounded-xl shrink-0"
                >
                  <Share2 className="h-5 w-5" />
                </Button>
              </div>

              {/* Trust Badges */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-6 border-t">
                <div className="flex items-start gap-3 p-4 rounded-xl bg-primary/10 border border-primary/20">
                  <div className="rounded-full p-2 bg-primary/15">
                    <CheckCircle2 className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold">100% Authentic</p>
                    <p className="text-xs text-muted-foreground">
                      Certified Diamonds
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3 p-4 rounded-xl bg-primary/10 border border-primary/20">
                  <div className="rounded-full p-2 bg-primary/15">
                    <RotateCcw className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold">Easy Returns</p>
                    <p className="text-xs text-muted-foreground">
                      Within 7 Days
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3 p-4 rounded-xl bg-primary/10 border border-primary/20">
                  <div className="rounded-full p-2 bg-primary/15">
                    <Truck className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold">Free Delivery</p>
                    <p className="text-xs text-muted-foreground">
                      Insured Shipping
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Detailed Specifications - Premium Tabbed Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-12 sm:mb-16 md:mb-20"
          >
            <div className="max-w-5xl mx-auto w-full min-w-0">
              <h2 className="text-2xl sm:text-3xl font-bold mb-6 sm:mb-8 text-center px-2">
                Product Details
              </h2>

              {/* Tabs */}
              <div className="flex gap-1 sm:gap-2 mb-6 sm:mb-8 border-b overflow-x-auto pb-px -mx-1 px-1">
                <button
                  type="button"
                  onClick={() => setActiveTab("specifications")}
                  className={`px-3 py-3 sm:px-6 sm:py-4 text-sm sm:text-base font-semibold transition-all whitespace-nowrap shrink-0 ${
                    activeTab === "specifications"
                      ? "text-primary border-b-2 border-primary"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  Specifications
                </button>
                <button
                  type="button"
                  onClick={() => setActiveTab("care")}
                  className={`px-3 py-3 sm:px-6 sm:py-4 text-sm sm:text-base font-semibold transition-all whitespace-nowrap shrink-0 ${
                    activeTab === "care"
                      ? "text-primary border-b-2 border-primary"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  Care Instructions
                </button>
                <button
                  type="button"
                  onClick={() => setActiveTab("shipping")}
                  className={`px-3 py-3 sm:px-6 sm:py-4 text-sm sm:text-base font-semibold transition-all whitespace-nowrap shrink-0 ${
                    activeTab === "shipping"
                      ? "text-primary border-b-2 border-primary"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  Shipping & Returns
                </button>
              </div>

              {/* Tab Content */}
              <div className="bg-card rounded-2xl border p-4 sm:p-6 md:p-8">
                {activeTab === "specifications" && (
                  <div className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-6">
                      {/* Diamond Details */}
                      <div className="space-y-4">
                        <h3 className="text-xl font-bold flex items-center gap-2">
                          <Gem className="h-5 w-5 text-primary" />
                          Diamond Details
                        </h3>
                        <div className="space-y-3">
                          <div className="flex justify-between py-2 border-b">
                            <span className="text-muted-foreground">Type</span>
                            <span className="font-semibold">
                              {product.specifications.diamondType}
                            </span>
                          </div>
                          {product.specifications.caratWeight && (
                            <div className="flex justify-between py-2 border-b">
                              <span className="text-muted-foreground">
                                Diamond Weight
                              </span>
                              <span className="font-semibold">
                                {product.specifications.caratWeight}
                              </span>
                            </div>
                          )}
                          {product.specifications.clarity && (
                            <div className="flex justify-between py-2 border-b">
                              <span className="text-muted-foreground">
                                Clarity
                              </span>
                              <span className="font-semibold">
                                {product.specifications.clarity}
                              </span>
                            </div>
                          )}
                          {product.specifications.color && (
                            <div className="flex justify-between py-2 border-b">
                              <span className="text-muted-foreground">
                                Color
                              </span>
                              <span className="font-semibold">
                                {product.specifications.color}
                              </span>
                            </div>
                          )}
                          {product.specifications.cut && (
                            <div className="flex justify-between py-2 border-b">
                              <span className="text-muted-foreground">Cut</span>
                              <span className="font-semibold">
                                {product.specifications.cut}
                              </span>
                            </div>
                          )}
                          {product.specifications.numberOfDiamonds && (
                            <div className="flex justify-between py-2 border-b">
                              <span className="text-muted-foreground">
                                Number of Diamonds
                              </span>
                              <span className="font-semibold">
                                {product.specifications.numberOfDiamonds}
                              </span>
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Metal & Manufacturing */}
                      <div className="space-y-4">
                        <h3 className="text-xl font-bold flex items-center gap-2">
                          <Award className="h-5 w-5 text-primary" />
                          Metal & Manufacturing
                        </h3>
                        <div className="space-y-3">
                          <div className="flex justify-between py-2 border-b">
                            <span className="text-muted-foreground">
                              Metal Type
                            </span>
                            <span className="font-semibold">
                              {product.specifications.metalType}
                            </span>
                          </div>
                          <div className="flex justify-between py-2 border-b">
                            <span className="text-muted-foreground">
                              Gross Weight
                            </span>
                            <span className="font-semibold">
                              {product.specifications.weight}
                            </span>
                          </div>
                          {product.specifications.netWeight && (
                            <div className="flex justify-between py-2 border-b">
                              <span className="text-muted-foreground">
                                Net Weight
                              </span>
                              <span className="font-semibold">
                                {product.specifications.netWeight}
                              </span>
                            </div>
                          )}
                          <div className="flex justify-between py-2 border-b">
                            <span className="text-muted-foreground">
                              Manufacturing
                            </span>
                            <span className="font-semibold">
                              {product.specifications.manufacturing}
                            </span>
                          </div>
                          <div className="flex justify-between py-2 border-b">
                            <span className="text-muted-foreground">
                              Certificate
                            </span>
                            <span className="font-semibold">
                              {product.specifications.certificate}
                            </span>
                          </div>
                          {product.specifications.settingType && (
                            <div className="flex justify-between py-2 border-b">
                              <span className="text-muted-foreground">
                                Setting Type
                              </span>
                              <span className="font-semibold">
                                {product.specifications.settingType}
                              </span>
                            </div>
                          )}
                          {product.specifications.dimensions && (
                            <div className="flex justify-between py-2 border-b">
                              <span className="text-muted-foreground">
                                Dimensions
                              </span>
                              <span className="font-semibold">
                                {product.specifications.dimensions}
                              </span>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Additional Info */}
                    <div className="mt-8 p-6 rounded-xl bg-muted/30">
                      <div className="flex items-start gap-3">
                        <Info className="h-5 w-5 text-primary mt-0.5" />
                        <div>
                          <h4 className="font-semibold mb-2">
                            Why Lab-Grown Diamonds?
                          </h4>
                          <p className="text-sm text-muted-foreground leading-relaxed">
                            Lab-grown diamonds are chemically, physically, and
                            optically identical to natural diamonds. They offer
                            exceptional quality, are ethically sourced,
                            environmentally sustainable, and provide excellent
                            value—making them the perfect choice for modern,
                            conscious consumers.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {activeTab === "care" && (
                  <div className="space-y-6">
                    <h3 className="text-xl font-bold flex items-center gap-2">
                      <Shield className="h-5 w-5 text-primary" />
                      Care & Maintenance
                    </h3>
                    <div className="space-y-4">
                      <div className="flex gap-4">
                        <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary font-semibold">
                          1
                        </div>
                        <div>
                          <h4 className="font-semibold mb-1">
                            Regular Cleaning
                          </h4>
                          <p className="text-muted-foreground">
                            Clean your diamond jewellery regularly with warm
                            water, mild soap, and a soft brush. Rinse thoroughly
                            and dry with a lint-free cloth.
                          </p>
                        </div>
                      </div>
                      <div className="flex gap-4">
                        <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary font-semibold">
                          2
                        </div>
                        <div>
                          <h4 className="font-semibold mb-1">Safe Storage</h4>
                          <p className="text-muted-foreground">
                            Store each piece separately in a soft pouch or lined
                            jewellery box to prevent scratches and tangling.
                          </p>
                        </div>
                      </div>
                      <div className="flex gap-4">
                        <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary font-semibold">
                          3
                        </div>
                        <div>
                          <h4 className="font-semibold mb-1">
                            Avoid Chemicals
                          </h4>
                          <p className="text-muted-foreground">
                            Remove jewellery before swimming, bathing, or using
                            household chemicals. Exposure to chlorine and harsh
                            chemicals can damage the metal.
                          </p>
                        </div>
                      </div>
                      <div className="flex gap-4">
                        <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary font-semibold">
                          4
                        </div>
                        <div>
                          <h4 className="font-semibold mb-1">
                            Professional Inspection
                          </h4>
                          <p className="text-muted-foreground">
                            Have your jewellery professionally inspected and
                            cleaned at least once a year to ensure settings are
                            secure.
                          </p>
                        </div>
                      </div>
                      <div className="flex gap-4">
                        <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary font-semibold">
                          5
                        </div>
                        <div>
                          <h4 className="font-semibold mb-1">
                            Remove During Activities
                          </h4>
                          <p className="text-muted-foreground">
                            Take off your jewellery during sports, exercise, or
                            manual work to prevent damage or loss.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {activeTab === "shipping" && (
                  <div className="space-y-8">
                    <div>
                      <h3 className="text-xl font-bold flex items-center gap-2 mb-4">
                        <Truck className="h-5 w-5 text-primary" />
                        Shipping Information
                      </h3>
                      <div className="space-y-3">
                        <div className="flex justify-between py-2 border-b">
                          <span className="text-muted-foreground">
                            Delivery Time
                          </span>
                          <span className="font-semibold">
                            5-7 Business Days
                          </span>
                        </div>
                        <div className="flex justify-between py-2 border-b">
                          <span className="text-muted-foreground">
                            Shipping Cost
                          </span>
                          <span className="font-semibold text-primary">
                            Free Shipping
                          </span>
                        </div>
                        <div className="flex justify-between py-2 border-b">
                          <span className="text-muted-foreground">
                            Insurance
                          </span>
                          <span className="font-semibold">Fully Insured</span>
                        </div>
                      </div>
                    </div>

                    <div>
                      <h3 className="text-xl font-bold flex items-center gap-2 mb-4">
                        <RotateCcw className="h-5 w-5 text-primary" />
                        Return Policy
                      </h3>
                      <div className="space-y-4">
                        <p className="text-muted-foreground">
                          We offer a 7-day return policy for all products. Items
                          must be returned in their original condition with all
                          tags, certificates, and packaging.
                        </p>
                        <div className="space-y-2">
                          <div className="flex items-start gap-2">
                            <CheckCircle2 className="h-5 w-5 text-primary mt-0.5" />
                            <span className="text-sm">
                              Hassle-free returns within 7 days
                            </span>
                          </div>
                          <div className="flex items-start gap-2">
                            <CheckCircle2 className="h-5 w-5 text-primary mt-0.5" />
                            <span className="text-sm">
                              Full refund or exchange available
                            </span>
                          </div>
                          <div className="flex items-start gap-2">
                            <CheckCircle2 className="h-5 w-5 text-primary mt-0.5" />
                            <span className="text-sm">
                              Free return shipping
                            </span>
                          </div>
                          <div className="flex items-start gap-2">
                            <CheckCircle2 className="h-5 w-5 text-primary mt-0.5" />
                            <span className="text-sm">
                              No questions asked policy
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </motion.div>

          {/* Related Products */}
          {relatedProducts.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-2xl sm:text-3xl font-bold mb-6 sm:mb-8 text-center px-2">
                You May Also Like
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {relatedProducts.map((relatedProduct) => (
                  <ProductCard
                    key={relatedProduct.id}
                    product={relatedProduct}
                  />
                ))}
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </>
  );
}
