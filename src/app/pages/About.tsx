import { motion } from 'motion/react';
import { Sparkles, Heart, Users, Leaf, Shield } from 'lucide-react';

export function About() {
  const values = [
    {
      icon: Sparkles,
      title: 'Quality Excellence',
      description: 'Every piece is crafted with meticulous attention to detail and certified by IGI/GIA.',
    },
    {
      icon: Leaf,
      title: 'Sustainable Choice',
      description: 'Lab-grown diamonds are environmentally friendly and conflict-free.',
    },
    {
      icon: Heart,
      title: 'Customer First',
      description: 'Your satisfaction is our priority with 7-day returns and lifetime support.',
    },
    {
      icon: Shield,
      title: 'Trust & Transparency',
      description: 'Complete transparency in pricing, certification, and sourcing.',
    },
  ];

  const milestones = [
    { year: '2020', title: 'Company Founded', description: 'Started with a vision to make luxury accessible' },
    { year: '2021', title: '10,000+ Customers', description: 'Reached our first major milestone' },
    { year: '2023', title: 'International Expansion', description: 'Began shipping to 50+ countries' },
    { year: '2026', title: 'Industry Leaders', description: 'Recognized as top lab-grown diamond retailer' },
  ];

  return (
    <div className="min-h-screen overflow-x-hidden">
      {/* Hero Section */}
      <section className="relative py-10 md:py-14 px-3 sm:px-4 bg-gradient-to-br from-primary/8 to-primary/15">
        <div className="container mx-auto max-w-4xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 md:mb-5">About Us</h1>
            <p className="text-sm sm:text-base md:text-lg text-muted-foreground leading-relaxed px-1">
              We're on a mission to revolutionize the jewellery industry with ethically sourced,
              lab-grown diamonds that combine timeless elegance with modern sustainability.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-12 md:py-16 px-3 sm:px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-6">Our Story</h2>
              <div className="space-y-4 text-muted-foreground">
                <p>
                  Founded in 2020, our journey began with a simple belief: luxury jewellery should be
                  both beautiful and sustainable. We pioneered the use of lab-grown diamonds,
                  offering the same brilliance as mined diamonds but with a clear conscience.
                </p>
                <p>
                  Today, we're proud to serve thousands of customers worldwide, each piece telling
                  a unique story of love, celebration, and commitment. Our expert craftspeople
                  combine traditional techniques with cutting-edge technology to create jewellery
                  that stands the test of time.
                </p>
                <p>
                  Every diamond we offer is certified by internationally recognized laboratories,
                  ensuring you receive nothing but the finest quality. We believe in complete
                  transparency, from our pricing to our sourcing practices.
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative aspect-square rounded-2xl overflow-hidden"
            >
              <img
                src="https://images.unsplash.com/photo-1764512680324-048f158cab2b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBqZXdlbGxlcnklMjBzdG9yZSUyMGRpc3BsYXl8ZW58MXx8fHwxNzczNTgzNTMxfDA&ixlib=rb-4.1.0&q=80&w=1080"
                alt="Luxury jewellery showroom"
                className="w-full h-full object-cover"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-12 md:py-16 px-3 sm:px-4 bg-muted/30">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-8 md:mb-10">
            <h2 className="text-2xl sm:text-3xl font-bold mb-3 md:mb-4">Our Values</h2>
            <p className="text-sm sm:text-base text-muted-foreground max-w-2xl mx-auto px-2">
              The principles that guide everything we do
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, index) => {
              const Icon = value.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-card rounded-lg border p-6 text-center"
                >
                  <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-primary/10 mb-4">
                    <Icon className="h-7 w-7 text-primary" />
                  </div>
                  <h3 className="font-bold mb-2">{value.title}</h3>
                  <p className="text-sm text-muted-foreground">{value.description}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="py-12 md:py-16 px-3 sm:px-4">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center mb-8 md:mb-10">
            <h2 className="text-2xl sm:text-3xl font-bold mb-3 md:mb-4">Our Journey</h2>
            <p className="text-sm sm:text-base text-muted-foreground px-2">
              Milestones that shaped our story
            </p>
          </div>

          <div className="space-y-8">
            {milestones.map((milestone, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="flex gap-3 sm:gap-6 items-start min-w-0"
              >
                <div className="w-14 sm:w-20 flex-shrink-0 text-right">
                  <span className="text-lg sm:text-2xl font-bold text-primary tabular-nums">{milestone.year}</span>
                </div>
                <div className="relative flex-shrink-0">
                  <div className="w-4 h-4 rounded-full bg-primary" />
                  {index < milestones.length - 1 && (
                    <div className="absolute left-1/2 top-4 w-0.5 h-16 bg-primary/30 -translate-x-1/2" />
                  )}
                </div>
                <div className="flex-1 pb-8">
                  <h3 className="font-bold text-base sm:text-lg md:text-xl mb-2">{milestone.title}</h3>
                  <p className="text-muted-foreground">{milestone.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-12 md:py-16 px-3 sm:px-4 bg-muted/30">
        <div className="container mx-auto max-w-4xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <Users className="h-10 w-10 sm:h-12 sm:w-12 text-primary mx-auto mb-4 sm:mb-6" />
            <h2 className="text-2xl sm:text-3xl font-bold mb-3 md:mb-4">Join Our Team</h2>
            <p className="text-sm sm:text-base text-muted-foreground mb-6 md:mb-8 max-w-2xl mx-auto px-2">
              We're always looking for passionate individuals who share our vision.
              If you're interested in joining our team, we'd love to hear from you.
            </p>
            <a href="/contact" className="text-primary font-semibold hover:underline">
              Get in Touch →
            </a>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
