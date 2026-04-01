export interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  rating: number;
  reviews: number;
  images: string[];
  metalColors: string[];
  purities: string[];
  description: string;
  specifications: {
    diamondType: string;
    metalType: string;
    weight: string;
    netWeight?: string;
    certificate: string;
    manufacturing: string;
    caratWeight?: string;
    clarity?: string;
    color?: string;
    cut?: string;
    dimensions?: string;
    settingType?: string;
    numberOfDiamonds?: string;
    metalWeight?: string;
    careInstructions?: string;
  };
}

export const products: Product[] = [
  {
    id: 'RNG001',
    name: 'Classic Solitaire Diamond Ring',
    category: 'Rings',
    price: 45999,
    rating: 4.8,
    reviews: 124,
    images: [
      'https://images.unsplash.com/photo-1769230361954-69a5bd0fcb2e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkaWFtb25kJTIwcmluZyUyMGpld2VsbGVyeSUyMGx1eHVyeXxlbnwxfHx8fDE3NzM1NzM2NTF8MA&ixlib=rb-4.1.0&q=80&w=1080',
      'https://images.unsplash.com/photo-1666210508877-10798b0622b2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzb2xpdGFpcmUlMjBkaWFtb25kJTIwZW5nYWdlbWVudCUyMHJpbmd8ZW58MXx8fHwxNzczNTgzNTI5fDA&ixlib=rb-4.1.0&q=80&w=1080',
      'https://images.unsplash.com/photo-1742240439165-60790db1ee93?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3ZWRkaW5nJTIwcmluZyUyMGdvbGQlMjBkaWFtb25kfGVufDF8fHx8MTc3MzU4MzUyOXww&ixlib=rb-4.1.0&q=80&w=1080',
    ],
    metalColors: ['White Gold', 'Yellow Gold', 'Rose Gold'],
    purities: ['10K', '14K', '18K', '925 Silver'],
    description: 'Elegant solitaire diamond ring featuring a brilliant lab-grown diamond set in premium gold.',
    specifications: {
      diamondType: 'Lab Grown Diamond & Real Diamond are available',
      metalType: 'Gold',
      weight: '3.5 grams',
      netWeight: '3.1 grams',
      certificate: 'IGI Certificate Included',
      manufacturing: 'Handcrafted with precision',
      caratWeight: '1.0 carat',
      clarity: 'VVS1',
      color: 'D',
      cut: 'Excellent',
    },
  },
  {
    id: 'ERG001',
    name: 'Diamond Stud Earrings',
    category: 'Earrings',
    price: 32999,
    rating: 4.9,
    reviews: 89,
    images: [
      'https://images.unsplash.com/photo-1770722272510-ef28c6f57541?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkaWFtb25kJTIwZWFycmluZ3MlMjBlbGVnYW50JTIwamV3ZWxsZXJ5fGVufDF8fHx8MTc3MzU4MzUyN3ww&ixlib=rb-4.1.0&q=80&w=1080',
      'https://images.unsplash.com/photo-1769078595478-5f756986b818?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxnb2xkJTIwc3R1ZCUyMGVhcnJpbmdzJTIwZGlhbW9uZHxlbnwxfHx8fDE3NzM1ODM1MzB8MA&ixlib=rb-4.1.0&q=80&w=1080',
    ],
    metalColors: ['White Gold', 'Yellow Gold', 'Rose Gold'],
    purities: ['10K', '14K', '18K', '925 Silver'],
    description: 'Timeless diamond stud earrings perfect for everyday elegance.',
    specifications: {
      diamondType: 'Lab Grown Diamond & Real Diamond are available',
      metalType: 'Gold',
      weight: '2.8 grams',
      netWeight: '2.5 grams',
      certificate: 'GIA Certificate Included',
      manufacturing: 'Machine precision with hand finishing',
      caratWeight: '0.5 carat',
      clarity: 'VS1',
      color: 'E',
      cut: 'Very Good',
    },
  },
  {
    id: 'PND001',
    name: 'Heart Diamond Pendant',
    category: 'Pendant Set',
    price: 28999,
    rating: 4.7,
    reviews: 56,
    images: [
      'https://images.unsplash.com/photo-1771515411694-57fb626159d1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkaWFtb25kJTIwcGVuZGFudCUyMG5lY2tsYWNlJTIwbHV4dXJ5fGVufDF8fHx8MTc3MzUyMDE3OHww&ixlib=rb-4.1.0&q=80&w=1080',
    ],
    metalColors: ['White Gold', 'Yellow Gold', 'Rose Gold'],
    purities: ['10K', '14K', '18K', '925 Silver'],
    description: 'Beautiful heart-shaped diamond pendant with delicate chain.',
    specifications: {
      diamondType: 'Lab Grown Diamond & Real Diamond are available',
      metalType: 'Gold with chain',
      weight: '4.2 grams',
      netWeight: '3.8 grams',
      certificate: 'IGI Certificate Included',
      manufacturing: 'Handcrafted design',
      caratWeight: '0.75 carat',
      clarity: 'SI1',
      color: 'F',
      cut: 'Good',
    },
  },
  {
    id: 'BRC001',
    name: 'Tennis Diamond Bracelet',
    category: 'Bracelet',
    price: 55999,
    rating: 4.9,
    reviews: 112,
    images: [
      'https://images.unsplash.com/photo-1758995115643-1e8348bfde39?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxnb2xkJTIwYnJhY2VsZXQlMjBqZXdlbGxlcnklMjBlbGVnYW50fGVufDF8fHx8MTc3MzU4MzUyOHww&ixlib=rb-4.1.0&q=80&w=1080',
    ],
    metalColors: ['White Gold', 'Yellow Gold', 'Rose Gold'],
    purities: ['10K', '14K', '18K', '925 Silver'],
    description: 'Luxurious tennis bracelet adorned with brilliant lab-grown diamonds.',
    specifications: {
      diamondType: 'Lab Grown Diamond & Real Diamond are available',
      metalType: 'Gold',
      weight: '12.5 grams',
      netWeight: '11.6 grams',
      certificate: 'GIA Certificate Included',
      manufacturing: 'Premium craftsmanship',
      caratWeight: '0.5 carat',
      clarity: 'VS2',
      color: 'G',
      cut: 'Very Good',
      numberOfDiamonds: '10',
    },
  },
  {
    id: 'NSP001',
    name: 'Traditional Diamond Nose Pin',
    category: 'Nose Pins',
    price: 8999,
    rating: 4.6,
    reviews: 78,
    images: [
      'https://images.unsplash.com/photo-1689777238693-cb78d99478a2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkaWFtb25kJTIwbm9zZSUyMHBpbiUyMGpld2VsbGVyeXxlbnwxfHx8fDE3NzM1ODM1Mjl8MA&ixlib=rb-4.1.0&q=80&w=1080',
    ],
    metalColors: ['White Gold', 'Yellow Gold', 'Rose Gold'],
    purities: ['10K', '14K', '18K', '925 Silver'],
    description: 'Elegant nose pin featuring a single sparkling lab-grown diamond.',
    specifications: {
      diamondType: 'Lab Grown Diamond & Real Diamond are available',
      metalType: 'Gold',
      weight: '0.5 grams',
      netWeight: '0.4 grams',
      certificate: 'IGI Certificate Included',
      manufacturing: 'Delicate handcrafted design',
      caratWeight: '0.25 carat',
      clarity: 'SI2',
      color: 'H',
      cut: 'Fair',
    },
  },
  {
    id: 'RNG002',
    name: 'Vintage Diamond Ring',
    category: 'Rings',
    price: 42999,
    rating: 4.8,
    reviews: 95,
    images: [
      'https://images.unsplash.com/photo-1742240439165-60790db1ee93?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3ZWRkaW5nJTIwcmluZyUyMGdvbGQlMjBkaWFtb25kfGVufDF8fHx8MTc3MzU4MzUyOXww&ixlib=rb-4.1.0&q=80&w=1080',
    ],
    metalColors: ['White Gold', 'Yellow Gold', 'Rose Gold'],
    purities: ['10K', '14K', '18K', '925 Silver'],
    description: 'Vintage-inspired diamond ring with intricate detailing.',
    specifications: {
      diamondType: 'Lab Grown Diamond & Real Diamond are available',
      metalType: 'Gold',
      weight: '4.0 grams',
      netWeight: '3.6 grams',
      certificate: 'GIA Certificate Included',
      manufacturing: 'Vintage design handcrafted',
      caratWeight: '0.75 carat',
      clarity: 'VS1',
      color: 'F',
      cut: 'Very Good',
    },
  },
  {
    id: 'RNG003',
    name: 'Halo Diamond Engagement Ring',
    category: 'Rings',
    price: 52999,
    rating: 5.0,
    reviews: 156,
    images: [
      'https://images.unsplash.com/photo-1666210508877-10798b0622b2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzb2xpdGFpcmUlMjBkaWFtb25kJTIwZW5nYWdlbWVudCUyMHJpbmd8ZW58MXx8fHwxNzczNTgzNTI5fDA&ixlib=rb-4.1.0&q=80&w=1080',
    ],
    metalColors: ['White Gold', 'Yellow Gold', 'Rose Gold'],
    purities: ['10K', '14K', '18K', '925 Silver'],
    description: 'Stunning halo setting with center stone surrounded by smaller diamonds.',
    specifications: {
      diamondType: 'Lab Grown Diamond & Real Diamond are available',
      metalType: 'Gold',
      weight: '5.2 grams',
      netWeight: '4.7 grams',
      certificate: 'IGI Certificate Included',
      manufacturing: 'Expert craftsmanship',
      caratWeight: '1.0 carat',
      clarity: 'VVS1',
      color: 'D',
      cut: 'Excellent',
      numberOfDiamonds: '10',
    },
  },
  {
    id: 'ERG002',
    name: 'Drop Diamond Earrings',
    category: 'Earrings',
    price: 38999,
    rating: 4.7,
    reviews: 67,
    images: [
      'https://images.unsplash.com/photo-1769078595478-5f756986b818?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxnb2xkJTIwc3R1ZCUyMGVhcnJpbmdzJTIwZGlhbW9uZHxlbnwxfHx8fDE3NzM1ODM1MzB8MA&ixlib=rb-4.1.0&q=80&w=1080',
    ],
    metalColors: ['White Gold', 'Yellow Gold', 'Rose Gold'],
    purities: ['10K', '14K', '18K', '925 Silver'],
    description: 'Graceful drop earrings with cascading lab-grown diamonds.',
    specifications: {
      diamondType: 'Lab Grown Diamond & Real Diamond are available',
      metalType: 'Gold',
      weight: '3.8 grams',
      netWeight: '3.4 grams',
      certificate: 'GIA Certificate Included',
      manufacturing: 'Precision handmade',
      caratWeight: '0.5 carat',
      clarity: 'VS2',
      color: 'G',
      cut: 'Very Good',
      numberOfDiamonds: '2',
    },
  },
];

export const categories = [
  {
    name: 'Rings',
    image: 'https://images.unsplash.com/photo-1769230361954-69a5bd0fcb2e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkaWFtb25kJTIwcmluZyUyMGpld2VsbGVyeSUyMGx1eHVyeXxlbnwxfHx8fDE3NzM1NzM2NTF8MA&ixlib=rb-4.1.0&q=80&w=1080',
  },
  {
    name: 'Earrings',
    image: 'https://images.unsplash.com/photo-1770722272510-ef28c6f57541?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkaWFtb25kJTIwZWFycmluZ3MlMjBlbGVnYW50JTIwamV3ZWxsZXJ5fGVufDF8fHx8MTc3MzU4MzUyN3ww&ixlib=rb-4.1.0&q=80&w=1080',
  },
  {
    name: 'Pendant Set',
    image: 'https://images.unsplash.com/photo-1771515411694-57fb626159d1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkaWFtb25kJTIwcGVuZGFudCUyMG5lY2tsYWNlJTIwbHV4dXJ5fGVufDF8fHx8MTc3MzUyMDE3OHww&ixlib=rb-4.1.0&q=80&w=1080',
  },
  {
    name: 'Nose Pins',
    image: 'https://images.unsplash.com/photo-1689777238693-cb78d99478a2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkaWFtb25kJTIwbm9zZSUyMHBpbiUyMGpld2VsbGVyeXxlbnwxfHx8fDE3NzM1ODM1Mjl8MA&ixlib=rb-4.1.0&q=80&w=1080',
  },
  {
    name: 'Necklace Set',
    image: 'https://images.unsplash.com/photo-1617038260897-41a1f14a8ca0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxuZWNrbGFjZSUyMHNldCUyMGpld2VsbGVyeXxlbnwxfHx8fDE3OTU3MTM1MzF8MA&ixlib=rb-4.1.0&q=80&w=1080',
  },
  {
    name: 'Bracelet',
    image: 'https://images.unsplash.com/photo-1758995115643-1e8348bfde39?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxnb2xkJTIwYnJhY2VsZXQlMjBqZXdlbGxlcnklMjBlbGVnYW50fGVufDF8fHx8MTc3MzU4MzUyOHww&ixlib=rb-4.1.0&q=80&w=1080',
  },
  {
    name: "Women's Collection",
    image: 'https://images.unsplash.com/photo-1602173574767-37ac01994b2a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3b21lbnMlMjBqZXdlbGxlcnklMjBjb2xsZWN0aW9ufGVufDF8fHx8MTc5NTcxMzU1MHww&ixlib=rb-4.1.0&q=80&w=1080',
  },
  {
    name: "Men's Collection",
    image: 'https://images.unsplash.com/photo-1541099649105-f69ad21f3246?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtZW4lMjBqZXdlbGxlcnklMjByaW5nfGVufDF8fHx8MTc5NTcxNzAwMHww&ixlib=rb-4.1.0&q=80&w=1080',
  },
  {
    name: 'Other',
    image: 'https://images.unsplash.com/photo-1764512680324-048f158cab2b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBqZXdlbGxlcnklMjBzdG9yZSUyMGRpc3BsYXl8ZW58MXx8fHwxNzczNTgzNTMxfDA&ixlib=rb-4.1.0&q=80&w=1080',
  },
];