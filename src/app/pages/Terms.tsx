import { motion } from 'motion/react';

export function Terms() {
  const sections = [
    {
      title: 'Acceptance of Terms',
      content: `By accessing and using this website, you accept and agree to be bound by these Terms and Conditions. If you do not agree to these terms, please do not use our website or services. We reserve the right to modify these terms at any time, and your continued use constitutes acceptance of such changes.`,
    },
    {
      title: 'Products and Pricing',
      content: `• All products are subject to availability
• Prices are listed in the specified currency and include applicable taxes unless otherwise stated
• We reserve the right to modify prices at any time without prior notice
• Product descriptions and images are for illustrative purposes and may vary from actual products
• All lab-grown diamonds come with IGI or GIA certification as specified
• Custom orders are final and cannot be cancelled once production begins`,
    },
    {
      title: 'Ordering',
      content: `• Orders are placed by contacting us directly via WhatsApp (or other channels we specify)
• By requesting an order, you make an offer to purchase products subject to these terms
• We reserve the right to refuse or cancel any order for any reason
• Pricing, payment arrangements, and timelines are confirmed with you in writing (e.g. on WhatsApp) before production or dispatch
• You are responsible for ensuring contact and delivery details are accurate`,
    },
    {
      title: 'Shipping and Delivery',
      content: `• Shipping times are estimates and not guaranteed
• Free shipping is offered on orders above the specified amount
• International orders may be subject to customs duties and import taxes
• Risk of loss passes to you upon delivery to the carrier
• You are responsible for providing accurate shipping addresses
• We are not liable for delays caused by customs, weather, or carrier issues
• Insured shipping is included on all orders`,
    },
    {
      title: 'Returns and Refunds',
      content: `• We offer a 7-day return policy from the date of delivery
• Products must be returned in original condition with all packaging and certificates
• Custom or personalized items cannot be returned unless defective
• Return shipping costs are the customer's responsibility unless the item is defective
• Refunds will be processed within 7-10 business days of receiving the return
• Refunds will be issued using the same method agreed at the time of purchase
• Resized items cannot be returned`,
    },
    {
      title: 'Product Warranties',
      content: `• All products come with a lifetime warranty against manufacturing defects
• The warranty does not cover normal wear and tear, loss, theft, or damage from misuse
• Warranty service requires proof of purchase
• We reserve the right to repair or replace defective items at our discretion
• Diamond certifications are provided by independent laboratories (IGI/GIA)
• We guarantee the authenticity of all lab-grown diamonds`,
    },
    {
      title: 'Intellectual Property',
      content: `• All content on this website is owned by or licensed to us
• You may not reproduce, distribute, or create derivative works without permission
• Product images, descriptions, and designs are protected by copyright
• Our trademarks and logos may not be used without written consent
• User-generated content may be used by us for marketing purposes`,
    },
    {
      title: 'User Accounts',
      content: `• You are responsible for maintaining account confidentiality
• You must provide accurate and current information
• You are responsible for all activities under your account
• We reserve the right to terminate accounts that violate these terms
• Accounts cannot be transferred or sold to third parties`,
    },
    {
      title: 'Privacy and Data Protection',
      content: `• Your use of our website is subject to our Privacy Policy
• We collect and use personal information as described in our Privacy Policy
• We implement security measures to protect your information
• You have rights regarding your personal data as outlined in our Privacy Policy`,
    },
    {
      title: 'Limitation of Liability',
      content: `• Our liability is limited to the purchase price of the product
• We are not liable for indirect, incidental, or consequential damages
• We do not guarantee uninterrupted or error-free website operation
• Product images and descriptions are for illustration purposes only
• We are not responsible for third-party website content or links`,
    },
    {
      title: 'Indemnification',
      content: `You agree to indemnify and hold us harmless from any claims, damages, liabilities, and expenses arising from your use of our website, violation of these terms, or infringement of third-party rights.`,
    },
    {
      title: 'Dispute Resolution',
      content: `• Any disputes will be governed by the laws of the jurisdiction where we are located
• You agree to attempt resolution through negotiation before litigation
• Any legal action must be brought within one year of the cause of action arising
• You agree to arbitration if negotiation fails`,
    },
    {
      title: 'Severability',
      content: `If any provision of these terms is found to be invalid or unenforceable, the remaining provisions will continue in full force and effect.`,
    },
    {
      title: 'Contact Information',
      content: `For questions about these Terms and Conditions, please contact us:

Email: legal@mbbrothergems.com
WhatsApp / Phone: +91 88664 85742
Business: M B Brother Gems And Jewellery`,
    },
  ];

  return (
    <div className="min-h-screen py-8 sm:py-12 px-3 sm:px-4 overflow-x-hidden">
      <div className="container mx-auto max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h1 className="text-2xl sm:text-3xl font-bold mb-3 sm:mb-4">Terms & Conditions</h1>
          <p className="text-muted-foreground mb-8">Last Updated: March 15, 2026</p>

          <div className="bg-card rounded-lg border p-4 sm:p-6 mb-6 sm:mb-8">
            <p className="text-muted-foreground">
              These Terms and Conditions govern your use of our website and the purchase of our
              products. Please read them carefully before making a purchase. By using our website,
              you agree to be bound by these terms.
            </p>
          </div>

          <div className="space-y-8">
            {sections.map((section, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                className="bg-card rounded-lg border p-4 sm:p-6"
              >
                <h2 className="text-2xl font-bold mb-4">{section.title}</h2>
                <p className="text-muted-foreground whitespace-pre-line leading-relaxed">
                  {section.content}
                </p>
              </motion.div>
            ))}
          </div>

          <div className="mt-8 sm:mt-12 text-center bg-muted/50 rounded-lg p-5 sm:p-8">
            <p className="text-muted-foreground">
              By using our website and services, you acknowledge that you have read, understood,
              and agree to be bound by these Terms and Conditions.
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
