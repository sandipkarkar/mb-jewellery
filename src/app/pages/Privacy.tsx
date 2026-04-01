import { motion } from 'motion/react';

export function Privacy() {
  const sections = [
    {
      title: 'Information We Collect',
      content: `We collect information that you provide directly to us, including:
      
• Personal identification information (name, email address, phone number, shipping address)
• Details you share when ordering or messaging us (e.g. delivery address, preferences)
• Account information (username, password, preferences)
• Communication data (emails, chat messages, customer service interactions)
• Device and usage information (IP address, browser type, pages visited)`,
    },
    {
      title: 'How We Use Your Information',
      content: `We use the collected information for the following purposes:
      
• Process and fulfill your orders
• Communicate with you about your orders and account
• Send you promotional emails and marketing communications (with your consent)
• Improve our website, products, and services
• Prevent fraud and enhance security
• Comply with legal obligations and enforce our terms`,
    },
    {
      title: 'Information Sharing and Disclosure',
      content: `We may share your information with:
      
• Service providers who assist in operating our business (shipping carriers, email or messaging tools)
• Business partners for joint marketing initiatives (only with your consent)
• Law enforcement or government agencies when required by law
• In connection with a merger, acquisition, or sale of assets

We never sell your personal information to third parties for their marketing purposes.`,
    },
    {
      title: 'Data Security',
      content: `We implement industry-standard security measures to protect your personal information:
      
• Encryption (such as HTTPS) for data transmitted through our website
• Secure servers with reasonable access controls
• Limited employee access to personal data
• Regular security training for our team

However, no method of transmission over the internet is 100% secure, and we cannot guarantee absolute security.`,
    },
    {
      title: 'Your Rights and Choices',
      content: `You have the right to:
      
• Access, update, or delete your personal information
• Opt-out of marketing communications
• Request a copy of your data
• Object to certain uses of your information
• Lodge a complaint with a supervisory authority

To exercise these rights, please contact us at privacy@mbbrothergems.com`,
    },
    {
      title: 'Cookies',
      content: `We use cookies and similar technologies to:
      
• Remember your preferences and settings
• Improve website functionality
• Help keep our site reliable and secure

You can control cookies through your browser settings, but some features may not function properly if cookies are disabled.`,
    },
    {
      title: 'Children\'s Privacy',
      content: `Our services are not directed to children under 13 years of age. We do not knowingly collect personal information from children under 13. If you believe we have collected information from a child under 13, please contact us immediately.`,
    },
    {
      title: 'International Data Transfers',
      content: `Your information may be transferred to and processed in countries other than your country of residence. We ensure appropriate safeguards are in place to protect your information in accordance with applicable data protection laws.`,
    },
    {
      title: 'Changes to This Privacy Policy',
      content: `We may update this Privacy Policy from time to time. We will notify you of any material changes by posting the new policy on this page and updating the "Last Updated" date. We encourage you to review this policy periodically.`,
    },
    {
      title: 'Contact Us',
      content: `If you have any questions about this Privacy Policy, please contact us:
      
Email: privacy@mbbrothergems.com
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
          <h1 className="text-2xl sm:text-3xl font-bold mb-3 sm:mb-4">Privacy Policy</h1>
          <p className="text-muted-foreground mb-8">Last Updated: March 15, 2026</p>

          <div className="bg-card rounded-lg border p-4 sm:p-6 mb-6 sm:mb-8">
            <p className="text-muted-foreground">
              At M B Brother Gems And Jewellery, we are committed to protecting your privacy and ensuring
              the security of your personal information. This Privacy Policy explains how we collect,
              use, disclose, and safeguard your information when you visit our website or contact us to place an order.
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
                <h2 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4">{section.title}</h2>
                <p className="text-muted-foreground whitespace-pre-line leading-relaxed">
                  {section.content}
                </p>
              </motion.div>
            ))}
          </div>

          <div className="mt-8 sm:mt-12 text-center bg-muted/50 rounded-lg p-5 sm:p-8">
            <p className="text-muted-foreground">
              By using our website, you consent to our Privacy Policy and agree to its terms.
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
