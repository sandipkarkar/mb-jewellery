import { useState } from 'react';
import { Link } from 'react-router';
import { SlickSlider as Slider } from '../../utils/reactSlickSlider';
import { motion } from 'motion/react';
import { Shield, Award, TrendingUp, Sparkles, Clock, ChevronRight, Star, Mail, Instagram, Facebook, Twitter, Truck, RotateCcw, MessageCircle, ArrowRight, Gem } from 'lucide-react';
import { CategoryCard } from '../components/CategoryCard';
import { ProductCard } from '../components/ProductCard';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { whatsappUrl } from '../../utils/whatsapp';
import { SITE_NAME } from '../../config/site';
import { useProducts } from '../context/ProductsContext';
import { useCategories } from '../context/CategoriesContext';

// Hero carousel slides
const heroSlides = [
  {
    image: 'https://images.unsplash.com/photo-1675377294835-e71bdcd9850f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBkaWFtb25kJTIwamV3ZWxsZXJ5JTIwc2hvd2Nhc2UlMjBlbGVnYW50fGVufDF8fHx8MTc3MzU4Mzk3NHww&ixlib=rb-4.1.0&q=80&w=1080',
    badge: 'New Collection',
    title: 'Timeless Elegance',
    subtitle: 'Discover our exquisite collection of lab-grown diamond jewellery',
    cta: 'Shop Now',
  },
  {
    image: 'https://images.unsplash.com/photo-1748023593753-4949fdc19045?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkaWFtb25kJTIwcmluZyUyMGNsb3NlJTIwdXAlMjBsdXh1cnl8ZW58MXx8fHwxNzczNTgzOTc0fDA&ixlib=rb-4.1.0&q=80&w=1080',
    badge: 'Limited Time',
    title: 'Bridal Collection',
    subtitle: 'Make your special day unforgettable with stunning engagement rings',
    cta: 'Explore Collection',
  },
  {
    image: 'https://images.unsplash.com/photo-1762505464426-7467c051ea76?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkaWFtb25kJTIwbmVja2xhY2UlMjBwZW5kYW50JTIwZWxlZ2FudHxlbnwxfHx8fDE3NzM1ODM5NzR8MA&ixlib=rb-4.1.0&q=80&w=1080',
    badge: 'Spring Sale',
    title: 'Luxury Pendants',
    subtitle: 'Celebrate every moment with our handcrafted diamond pendants',
    cta: 'View Collection',
  },
];

// Testimonials data
const testimonials = [
  {
    name: 'Sarah Johnson',
    rating: 5,
    comment: 'Absolutely stunning! The quality exceeded my expectations. My engagement ring is perfect.',
    product: 'Halo Diamond Ring',
  },
  {
    name: 'Michael Chen',
    rating: 5,
    comment: 'Beautiful craftsmanship and excellent customer service. Highly recommend!',
    product: 'Tennis Bracelet',
  },
  {
    name: 'Priya Sharma',
    rating: 5,
    comment: 'The diamond earrings are gorgeous! Great value for lab-grown diamonds.',
    product: 'Diamond Studs',
  },
];

// Featured collections data
const featuredCollections = [
  {
    name: 'Bridal Collection',
    description: 'Make your special day unforgettable',
    image: 'https://images.unsplash.com/photo-1666210508877-10798b0622b2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzb2xpdGFpcmUlMjBkaWFtb25kJTIwZW5nYWdlbWVudCUyMHJpbmd8ZW58MXx8fHwxNzczNTgzNTI5fDA&ixlib=rb-4.1.0&q=80&w=1080',
    link: '/products?category=Rings',
  },
  {
    name: 'Everyday Luxury',
    description: 'Elegant pieces for daily wear',
    image: 'https://images.unsplash.com/photo-1770722272510-ef28c6f57541?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkaWFtb25kJTIwZWFycmluZ3MlMjBlbGVnYW50JTIwamV3ZWxsZXJ5fGVufDF8fHx8MTc3MzU4MzUyN3ww&ixlib=rb-4.1.0&q=80&w=1080',
    link: '/products?category=Earrings',
  },
  {
    name: 'Statement Pieces',
    description: 'Bold designs that turn heads',
    image: 'https://images.unsplash.com/photo-1771515411694-57fb626159d1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkaWFtb25kJTIwcGVuZGFudCUyMG5lY2tsYWNlJTIwbHV4dXJ5fGVufDF8fHx8MTc3MzUyMDE3OHww&ixlib=rb-4.1.0&q=80&w=1080',
    link: '/products?category=Pendant Set',
  },
];

export function Home() {
  const [emailSubscribed, setEmailSubscribed] = useState('');
  const { products } = useProducts();
  const { categories } = useCategories();
  
  const bestSelling = products.filter(p => p.rating >= 4.8).slice(0, 4);
  const newArrivals = [...products].reverse().slice(0, 4);

  // Hero carousel settings
  const heroSettings = {
    dots: true,
    infinite: true,
    speed: 1000,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 6000,
    fade: true,
    pauseOnHover: false,
    arrows: false,
    cssEase: 'cubic-bezier(0.87, 0.03, 0.41, 0.9)',
  };

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle newsletter subscription
    alert(`Thank you for subscribing! We'll send updates to ${emailSubscribed}`);
    setEmailSubscribed('');
  };

  return (
    <div className="min-h-screen overflow-x-hidden">
      {/* Premium Hero Carousel — shorter on mobile, scales up on larger screens */}
      <section className="relative home-hero">
        <Slider {...heroSettings}>
          {heroSlides.map((slide, index) => (
            <div key={index} className="relative">
              <div className="relative min-h-[380px] h-[min(72svh,30rem)] sm:min-h-[420px] sm:h-[min(66svh,34rem)] md:min-h-[460px] md:h-[min(62svh,38rem)] lg:min-h-[520px] lg:h-[min(58vh,42rem)] xl:min-h-[560px] xl:max-h-[min(92vh,46rem)]">
                {/* Background image (img avoids inline background-image styles) */}
                <div className="absolute inset-0">
                  <img
                    src={slide.image}
                    alt=""
                    className="absolute inset-0 h-full w-full object-cover pointer-events-none"
                    decoding="async"
                    fetchPriority={index === 0 ? 'high' : 'low'}
                    aria-hidden
                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/60 to-black/30" />
                </div>
                
                {/* Content */}
                <div className="relative h-full container mx-auto px-3 sm:px-4 flex items-center pb-10 sm:pb-8">
                  <motion.div 
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, delay: 0.3, ease: 'easeOut' }}
                    className="max-w-3xl text-white py-4"
                  >
                    {/* Badge */}
                    <motion.div 
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.8, delay: 0.5 }}
                      className="inline-flex items-center gap-1.5 sm:gap-2 px-3 py-1.5 sm:px-4 sm:py-2 bg-white/10 backdrop-blur-md border border-white/30 rounded-full mb-3 sm:mb-5"
                    >
                      <Sparkles className="h-3.5 w-3.5 sm:h-4 sm:w-4 shrink-0" />
                      <span className="text-[10px] sm:text-xs font-medium tracking-wide uppercase">{slide.badge}</span>
                    </motion.div>
                    
                    {/* Title */}
                    <motion.h1 
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 1, delay: 0.6 }}
                      className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold mb-3 sm:mb-4 md:mb-5 leading-[1.12] tracking-tight"
                    >
                      {slide.title}
                    </motion.h1>
                    
                    {/* Subtitle */}
                    <motion.p 
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 1, delay: 0.8 }}
                      className="text-sm sm:text-base md:text-lg lg:text-xl mb-5 sm:mb-6 md:mb-8 text-white/90 max-w-2xl leading-relaxed"
                    >
                      {slide.subtitle}
                    </motion.p>
                    
                    {/* CTA Button */}
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.8, delay: 1 }}
                    >
                      <Link to="/products">
                        <Button size="default" className="text-sm sm:text-base px-5 sm:px-8 py-2.5 sm:py-3 md:px-10 md:py-4 h-auto rounded-full shadow-xl hover:shadow-primary/40 transition-all duration-300 sm:hover:scale-[1.02]">
                          {slide.cta}
                          <ArrowRight className="ml-2 h-4 w-4 sm:h-5 sm:w-5" />
                        </Button>
                      </Link>
                    </motion.div>
                  </motion.div>
                </div>
              </div>
            </div>
          ))}
        </Slider>
      </section>

      {/* Brand Trust Section - Redesigned */}
      <section className="py-4 sm:py-5 md:py-6 border-b bg-background">
        <div className="container mx-auto px-3 sm:px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8">
            <div className="flex items-center gap-3 justify-center group">
              <div className="rounded-full p-2 bg-primary/10 group-hover:bg-primary/20 transition-colors">
                <Award className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="font-semibold text-sm md:text-base">100% Certified</p>
                <p className="text-xs text-muted-foreground">IGI/GIA Diamonds</p>
              </div>
            </div>
            <div className="flex items-center gap-3 justify-center group">
              <div className="rounded-full p-2 bg-primary/10 group-hover:bg-primary/20 transition-colors">
                <Truck className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="font-semibold text-sm md:text-base">Free Shipping</p>
                <p className="text-xs text-muted-foreground">Insured Delivery</p>
              </div>
            </div>
            <div className="flex items-center gap-3 justify-center group">
              <div className="rounded-full p-2 bg-primary/10 group-hover:bg-primary/20 transition-colors">
                <RotateCcw className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="font-semibold text-sm md:text-base">7-Day Returns</p>
                <p className="text-xs text-muted-foreground">Easy Process</p>
              </div>
            </div>
            <div className="flex items-center gap-3 justify-center group">
              <div className="rounded-full p-2 bg-primary/10 group-hover:bg-primary/20 transition-colors">
                <MessageCircle className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="font-semibold text-sm md:text-base">Order on WhatsApp</p>
                <p className="text-xs text-muted-foreground">Chat to purchase</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Collections - Enhanced */}
      <section className="py-12 md:py-20 lg:py-24 px-3 sm:px-4 bg-gradient-to-b from-background to-muted/20">
        <div className="container mx-auto">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-10 md:mb-14"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full mb-4">
              <Gem className="h-4 w-4 text-primary" />
              <span className="text-sm font-medium text-primary">Curated Collections</span>
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 md:mb-5 tracking-tight">Featured Collections</h2>
            <p className="text-sm sm:text-base md:text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed px-1">
              Explore our handpicked selections designed for life's most precious moments
            </p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
            {featuredCollections.map((collection, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.15, duration: 0.6 }}
              >
                <Link to={collection.link} className="group block">
                  <div className="relative overflow-hidden rounded-3xl aspect-[3/4] shadow-lg hover:shadow-2xl transition-all duration-500">
                    <img 
                      src={collection.image} 
                      alt={collection.name}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
                    <div className="absolute inset-0 bg-primary/0 group-hover:bg-primary/10 transition-colors duration-500" />
                    <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-6 md:p-8 text-white">
                      <h3 className="text-lg sm:text-xl md:text-2xl font-bold mb-2 md:mb-3">{collection.name}</h3>
                      <p className="text-white/90 mb-4 sm:mb-6 text-sm sm:text-base line-clamp-2 sm:line-clamp-none">{collection.description}</p>
                      <div className="flex items-center gap-2 text-sm font-semibold group-hover:gap-3 transition-all">
                        <span className="uppercase tracking-wider">Discover More</span>
                        <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Promotional Banner */}
      <section className="py-10 md:py-14 px-3 sm:px-4 bg-gradient-to-r from-primary to-[#d4883a] text-primary-foreground">
        <div className="container mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full mb-4">
              <Clock className="h-4 w-4" />
              <span className="text-sm font-medium">Limited Time Offer</span>
            </div>
            <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold mb-3 md:mb-4 px-1">
              Spring Sale - Up to 30% Off
            </h2>
            <p className="text-sm sm:text-base md:text-lg mb-6 md:mb-8 text-primary-foreground/85 max-w-2xl mx-auto px-2">
              Celebrate the season with exceptional savings on our finest lab-grown diamond jewellery
            </p>
            <Link to="/products">
              <Button size="default" variant="secondary" className="text-sm sm:text-base px-6 py-3 sm:px-8 sm:py-4 h-auto">
                Shop Sale
                <ChevronRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Best Selling Products */}
      <section className="py-12 md:py-16 px-3 sm:px-4 bg-muted/30">
        <div className="container mx-auto">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between mb-8 md:mb-10">
            <div>
              <div className="flex items-center gap-2 text-primary mb-1 sm:mb-2">
                <TrendingUp className="h-4 w-4 sm:h-5 sm:w-5 shrink-0" />
                <span className="font-semibold text-sm sm:text-base">Customer Favorites</span>
              </div>
              <h2 className="text-2xl sm:text-3xl md:text-3xl font-bold">Best Sellers</h2>
            </div>
            <Link to="/products" className="hidden md:flex items-center gap-2 text-primary hover:gap-3 transition-all">
              <span className="font-semibold">View All</span>
              <ChevronRight className="h-5 w-5" />
            </Link>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {bestSelling.map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <ProductCard product={product} />
              </motion.div>
            ))}
          </div>
          
          <div className="text-center mt-8 md:hidden">
            <Link to="/products">
              <Button variant="outline" size="lg">
                View All Products
                <ChevronRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Shop by Category */}
      <section className="py-12 md:py-16 px-3 sm:px-4">
        <div className="container mx-auto">
          <div className="text-center mb-8 md:mb-10">
            <h2 className="text-2xl sm:text-3xl font-bold mb-3 md:mb-4">Shop by Category</h2>
            <p className="text-sm sm:text-base text-muted-foreground px-2">
              Find the perfect piece for every occasion
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {categories.map((category, index) => (
              <motion.div
                key={category.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
              >
                <CategoryCard {...category} />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* New Arrivals */}
      <section className="py-12 md:py-16 px-3 sm:px-4 bg-muted/30">
        <div className="container mx-auto">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between mb-8 md:mb-10">
            <div>
              <div className="flex items-center gap-2 text-primary mb-1 sm:mb-2">
                <Sparkles className="h-4 w-4 sm:h-5 sm:w-5 shrink-0" />
                <span className="font-semibold text-sm sm:text-base">Just In</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold">New Arrivals</h2>
            </div>
            <Link to="/products" className="hidden md:flex items-center gap-2 text-primary hover:gap-3 transition-all">
              <span className="font-semibold">View All</span>
              <ChevronRight className="h-5 w-5" />
            </Link>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {newArrivals.map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <ProductCard product={product} />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Customer Testimonials */}
      <section className="py-12 md:py-16 px-3 sm:px-4">
        <div className="container mx-auto">
          <div className="text-center mb-8 md:mb-10">
            <h2 className="text-2xl sm:text-3xl font-bold mb-3 md:mb-4">What Our Customers Say</h2>
            <p className="text-sm sm:text-base text-muted-foreground px-2">
              Join thousands of happy customers who trust us
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-card rounded-2xl p-6 border shadow-sm"
              >
                <div className="flex gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <p className="text-muted-foreground mb-4 italic">"{testimonial.comment}"</p>
                <div>
                  <p className="font-semibold">{testimonial.name}</p>
                  <p className="text-sm text-muted-foreground">Purchased: {testimonial.product}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Trust Badges & Certifications */}
      <section className="py-10 md:py-14 px-3 sm:px-4 bg-muted/30 border-y">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center space-y-4">
              <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-primary/10">
                <Award className="h-10 w-10 text-primary" />
              </div>
              <div>
                <h3 className="text-lg sm:text-xl font-bold mb-2">Certified Diamonds</h3>
                <p className="text-muted-foreground">
                  Every diamond comes with IGI or GIA certification, ensuring authenticity and quality
                </p>
              </div>
            </div>
            <div className="text-center space-y-4">
              <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-primary/10">
                <Shield className="h-10 w-10 text-primary" />
              </div>
              <div>
                <h3 className="text-lg sm:text-xl font-bold mb-2">Lifetime Warranty</h3>
                <p className="text-muted-foreground">
                  Comprehensive warranty covering manufacturing defects and craftsmanship
                </p>
              </div>
            </div>
            <div className="text-center space-y-4">
              <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-primary/10">
                <Sparkles className="h-10 w-10 text-primary" />
              </div>
              <div>
                <h3 className="text-lg sm:text-xl font-bold mb-2">Ethical Sourcing</h3>
                <p className="text-muted-foreground">
                  Lab-grown diamonds that are environmentally friendly and conflict-free
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-12 md:py-16 px-3 sm:px-4 bg-gradient-to-br from-primary/8 to-primary/15">
        <div className="container mx-auto max-w-4xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-6">
              <Mail className="h-8 w-8 text-primary" />
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold mb-3 md:mb-4">Join Our Newsletter</h2>
            <p className="text-sm sm:text-base text-muted-foreground mb-6 md:mb-8 max-w-2xl mx-auto px-2">
              Subscribe to receive exclusive offers, new collection updates, and styling tips
            </p>
            
            <form onSubmit={handleNewsletterSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <Input
                type="email"
                placeholder="Enter your email"
                value={emailSubscribed}
                onChange={(e) => setEmailSubscribed(e.target.value)}
                required
                className="flex-1"
              />
              <Button type="submit" size="lg">
                Subscribe
              </Button>
            </form>
            
            <p className="text-xs text-muted-foreground mt-4">
              We respect your privacy. Unsubscribe at any time.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Social Showcase */}
      <section className="py-12 md:py-16 px-3 sm:px-4">
        <div className="container mx-auto">
          <div className="text-center mb-8 md:mb-10">
            <h2 className="text-2xl sm:text-3xl font-bold mb-3 md:mb-4">Follow Us on Instagram</h2>
            <p className="text-sm sm:text-base text-muted-foreground mb-4 md:mb-6 px-2">
              Tag us on Instagram for a chance to be featured
            </p>
            <div className="flex items-center justify-center gap-4">
              <a href="#" className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-gradient-to-r from-primary to-rose-500 text-primary-foreground hover:scale-110 transition-transform">
                <Instagram className="h-6 w-6" />
              </a>
              <a href="#" className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-primary text-primary-foreground hover:scale-110 transition-transform">
                <Facebook className="h-6 w-6" />
              </a>
              <a href="#" className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-[#d4883a] text-primary-foreground hover:scale-110 transition-transform">
                <Twitter className="h-6 w-6" />
              </a>
            </div>
          </div>
          
          {/* Instagram grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {products.slice(0, 4).map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                className="relative group cursor-pointer aspect-square rounded-lg overflow-hidden"
              >
                <img 
                  src={product.images[0]} 
                  alt={product.name}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <Instagram className="h-8 w-8 text-white" />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Floating WhatsApp — home page only */}
      <a
        href={whatsappUrl(`Hi ${SITE_NAME}, I'm interested in your jewellery collection.`)}
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50 flex h-12 w-12 sm:h-14 sm:w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg ring-2 sm:ring-4 ring-background/80 transition-transform hover:scale-105 hover:bg-[#20BD5A] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#25D366]"
        aria-label="Chat on WhatsApp"
      >
        <svg className="h-7 w-7 sm:h-8 sm:w-8" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.435 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
        </svg>
      </a>
    </div>
  );
}