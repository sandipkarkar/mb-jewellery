// Mock data for orders, addresses, and other user-specific information

export interface Address {
  id: string;
  name: string;
  phone: string;
  addressLine1: string;
  addressLine2?: string;
  city: string;
  state: string;
  pincode: string;
  country: string;
  isDefault: boolean;
}

export interface Order {
  id: string;
  orderDate: string;
  status: 'pending' | 'confirmed' | 'shipped' | 'delivered' | 'cancelled';
  items: {
    productId: string;
    name: string;
    image: string;
    price: number;
    quantity: number;
    selectedMetal: string;
    selectedPurity: string;
  }[];
  subtotal: number;
  shipping: number;
  tax: number;
  total: number;
  shippingAddress: Address;
  paymentMethod: string;
  trackingNumber?: string;
  deliveryDate?: string;
}

export const mockAddresses: Address[] = [
  {
    id: 'addr1',
    name: 'Sarah Johnson',
    phone: '+1 (555) 123-4567',
    addressLine1: '123 Main Street',
    addressLine2: 'Apt 4B',
    city: 'New York',
    state: 'NY',
    pincode: '10001',
    country: 'United States',
    isDefault: true,
  },
  {
    id: 'addr2',
    name: 'Sarah Johnson',
    phone: '+1 (555) 123-4567',
    addressLine1: '456 Oak Avenue',
    city: 'Brooklyn',
    state: 'NY',
    pincode: '11201',
    country: 'United States',
    isDefault: false,
  },
];

export const mockOrders: Order[] = [
  {
    id: 'ORD-2026-001',
    orderDate: '2026-03-10',
    status: 'delivered',
    items: [
      {
        productId: 'RNG001',
        name: 'Classic Solitaire Diamond Ring',
        image: 'https://images.unsplash.com/photo-1769230361954-69a5bd0fcb2e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkaWFtb25kJTIwcmluZyUyMGpld2VsbGVyeSUyMGx1eHVyeXxlbnwxfHx8fDE3NzM1NzM2NTF8MA&ixlib=rb-4.1.0&q=80&w=1080',
        price: 45999,
        quantity: 1,
        selectedMetal: 'White Gold',
        selectedPurity: '18K',
      },
    ],
    subtotal: 45999,
    shipping: 0,
    tax: 4600,
    total: 50599,
    shippingAddress: mockAddresses[0],
    paymentMethod: 'Credit Card ending in 4242',
    trackingNumber: 'TRK123456789',
    deliveryDate: '2026-03-12',
  },
  {
    id: 'ORD-2026-002',
    orderDate: '2026-03-08',
    status: 'shipped',
    items: [
      {
        productId: 'ERG001',
        name: 'Diamond Stud Earrings',
        image: 'https://images.unsplash.com/photo-1770722272510-ef28c6f57541?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkaWFtb25kJTIwZWFycmluZ3MlMjBlbGVnYW50JTIwamV3ZWxsZXJ5fGVufDF8fHx8MTc3MzU4MzUyN3ww&ixlib=rb-4.1.0&q=80&w=1080',
        price: 32999,
        quantity: 1,
        selectedMetal: 'Yellow Gold',
        selectedPurity: '14K',
      },
      {
        productId: 'PND001',
        name: 'Heart Diamond Pendant',
        image: 'https://images.unsplash.com/photo-1771515411694-57fb626159d1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkaWFtb25kJTIwcGVuZGFudCUyMG5lY2tsYWNlJTIwbHV4dXJ5fGVufDF8fHx8MTc3MzUyMDE3OHww&ixlib=rb-4.1.0&q=80&w=1080',
        price: 28999,
        quantity: 1,
        selectedMetal: 'Rose Gold',
        selectedPurity: '14K',
      },
    ],
    subtotal: 61998,
    shipping: 0,
    tax: 6200,
    total: 68198,
    shippingAddress: mockAddresses[0],
    paymentMethod: 'Credit Card ending in 4242',
    trackingNumber: 'TRK987654321',
  },
  {
    id: 'ORD-2026-003',
    orderDate: '2026-03-05',
    status: 'confirmed',
    items: [
      {
        productId: 'BRC001',
        name: 'Tennis Diamond Bracelet',
        image: 'https://images.unsplash.com/photo-1758995115643-1e8348bfde39?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxnb2xkJTIwYnJhY2VsZXQlMjBqZXdlbGxlcnklMjBlbGVnYW50fGVufDF8fHx8MTc3MzU4MzUyOHww&ixlib=rb-4.1.0&q=80&w=1080',
        price: 55999,
        quantity: 1,
        selectedMetal: 'White Gold',
        selectedPurity: '18K',
      },
    ],
    subtotal: 55999,
    shipping: 0,
    tax: 5600,
    total: 61599,
    shippingAddress: mockAddresses[1],
    paymentMethod: 'UPI Payment',
  },
];

export interface FAQ {
  question: string;
  answer: string;
  category: string;
}

export const faqs: FAQ[] = [
  {
    category: 'Lab-Grown Diamonds',
    question: 'What are lab-grown diamonds?',
    answer: 'Lab-grown diamonds are real diamonds created in controlled laboratory environments using advanced technology. They have the same physical, chemical, and optical properties as natural diamonds.',
  },
  {
    category: 'Lab-Grown Diamonds',
    question: 'Are lab-grown diamonds real diamonds?',
    answer: 'Yes, lab-grown diamonds are 100% real diamonds. They are chemically, physically, and optically identical to mined diamonds. The only difference is their origin.',
  },
  {
    category: 'Lab-Grown Diamonds',
    question: 'How are lab-grown diamonds certified?',
    answer: 'All our lab-grown diamonds are certified by internationally recognized laboratories like IGI (International Gemological Institute) and GIA (Gemological Institute of America).',
  },
  {
    category: 'Orders & Shipping',
    question: 'How long does shipping take?',
    answer: 'We offer free insured shipping on all orders. Domestic orders typically arrive within 3-5 business days, while international orders take 7-14 business days.',
  },
  {
    category: 'Orders & Shipping',
    question: 'Do you offer international shipping?',
    answer: 'Yes, we ship worldwide. International shipping is free for orders above $500, otherwise a flat rate of $50 applies.',
  },
  {
    category: 'Orders & Shipping',
    question: 'Can I track my order?',
    answer: 'Yes. After you place an order with us on WhatsApp, we will share order and delivery updates with you there.',
  },
  {
    category: 'Returns & Exchanges',
    question: 'What is your return policy?',
    answer: 'We offer a 7-day hassle-free return policy. If you are not completely satisfied with your purchase, you can return it within 7 days of delivery for a full refund.',
  },
  {
    category: 'Returns & Exchanges',
    question: 'How do I initiate a return?',
    answer: 'Message us on WhatsApp with your order details and reason for return. Our team will guide you through the process.',
  },
  {
    category: 'Returns & Exchanges',
    question: 'Do you offer exchanges?',
    answer: 'Yes, we offer free exchanges for different sizes or metal colors. Contact our customer support team to arrange an exchange.',
  },
  {
    category: 'Ordering',
    question: 'How do I place an order?',
    answer: 'Open any product page and tap "Order on WhatsApp", or message us from the cart with your selections. We will confirm price, customization, and payment options with you directly in chat.',
  },
  {
    category: 'Ordering',
    question: 'Do you accept online payment on this website?',
    answer: 'No. This site is for browsing and enquiries. Orders and payment arrangements are completed with us personally—typically via WhatsApp—so you always speak with a real person.',
  },
  {
    category: 'Product Information',
    question: 'Can I customize my jewellery?',
    answer: 'Yes, we offer customization options for metal type (White Gold, Yellow Gold, Rose Gold) and purity (10K, 14K, 18K, 925 Silver). For more extensive customization, please contact our design team.',
  },
  {
    category: 'Product Information',
    question: 'Do you provide certificates with jewellery?',
    answer: 'Yes, all our diamond jewellery comes with IGI or GIA certification. The certificate includes detailed information about the diamond\'s characteristics.',
  },
];
