import { useState } from 'react';
import { motion } from 'motion/react';
import { Search } from 'lucide-react';
import { Input } from '../components/ui/input';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '../components/ui/accordion';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import { faqs } from '../../data/mockData';

export function FAQ() {
  const [searchQuery, setSearchQuery] = useState('');

  const categories = Array.from(new Set(faqs.map((faq) => faq.category)));

  const filteredFAQs = searchQuery
    ? faqs.filter(
        (faq) =>
          faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
          faq.answer.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : faqs;

  return (
    <div className="min-h-screen py-8 sm:py-12 px-3 sm:px-4 overflow-x-hidden">
      <div className="container mx-auto max-w-4xl">
        {/* Header */}
        <div className="text-center mb-8 sm:mb-10">
          <h1 className="text-2xl sm:text-3xl font-bold mb-3 sm:mb-4">Frequently Asked Questions</h1>
          <p className="text-sm sm:text-base text-muted-foreground mb-6 sm:mb-8 px-2">
            Find answers to common questions about our products and services
          </p>

          {/* Search */}
          <div className="relative max-w-md mx-auto">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Search for questions..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>

        {/* FAQ Content */}
        {searchQuery ? (
          // Search Results
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="bg-card rounded-lg border p-4 sm:p-6"
          >
            <h2 className="text-lg sm:text-xl font-bold mb-4">
              {filteredFAQs.length} result{filteredFAQs.length !== 1 ? 's' : ''} found
            </h2>
            <Accordion type="single" collapsible className="w-full">
              {filteredFAQs.map((faq, index) => (
                <AccordionItem key={index} value={`item-${index}`}>
                  <AccordionTrigger className="text-left">
                    <div>
                      <p className="font-semibold">{faq.question}</p>
                      <p className="text-xs text-primary mt-1">{faq.category}</p>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
            {filteredFAQs.length === 0 && (
              <p className="text-center text-muted-foreground py-8">
                No results found. Try a different search term.
              </p>
            )}
          </motion.div>
        ) : (
          // Categories
          <Tabs defaultValue={categories[0]} className="w-full">
            <TabsList className="grid h-auto w-full grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-1 p-1">
              {categories.map((category) => (
                <TabsTrigger key={category} value={category} className="text-[11px] leading-tight sm:text-xs md:text-sm px-2 py-2 whitespace-normal text-center">
                  {category}
                </TabsTrigger>
              ))}
            </TabsList>

            {categories.map((category) => (
              <TabsContent key={category} value={category}>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-card rounded-lg border p-4 sm:p-6"
                >
                  <Accordion type="single" collapsible className="w-full">
                    {faqs
                      .filter((faq) => faq.category === category)
                      .map((faq, index) => (
                        <AccordionItem key={index} value={`item-${index}`}>
                          <AccordionTrigger className="text-left font-semibold">
                            {faq.question}
                          </AccordionTrigger>
                          <AccordionContent className="text-muted-foreground">
                            {faq.answer}
                          </AccordionContent>
                        </AccordionItem>
                      ))}
                  </Accordion>
                </motion.div>
              </TabsContent>
            ))}
          </Tabs>
        )}

        {/* Contact Section */}
        <div className="mt-8 sm:mt-12 text-center bg-muted/50 rounded-lg p-5 sm:p-8">
          <h3 className="text-lg sm:text-xl font-bold mb-2">Still have questions?</h3>
          <p className="text-muted-foreground mb-4">
            Can't find the answer you're looking for? Our customer support team is here to help.
          </p>
          <a href="/contact" className="text-primary font-semibold hover:underline">
            Contact Support →
          </a>
        </div>
      </div>
    </div>
  );
}
