import { Product } from '../store/useStore';

export const categories = [
  'Smartphones', 'Laptops', 'Gaming Consoles', 'Gaming Accessories',
  'Smart Watches', 'Tablets', 'Headphones & Earbuds', 'Computer Accessories',
  'Smart Home Devices', 'Cameras', 'Printers', 'Networking Devices',
  'Storage Devices', 'Monitors', 'Electronics Accessories'
];

export const brands = [
  'Apple', 'Samsung', 'Dell', 'HP', 'Lenovo', 'ASUS', 'Acer', 'MSI',
  'Sony', 'LG', 'Xiaomi', 'Huawei', 'OnePlus', 'JBL', 'Anker'
];

export const products: Product[] = [
  {
    id: 'p1',
    name: 'iPhone 15 Pro Max - 256GB, Natural Titanium',
    price: 5099,
    image: 'https://images.unsplash.com/photo-1695048133142-1a20484d2572?q=80&w=2070&auto=format&fit=crop',
    category: 'Smartphones',
    brand: 'Apple',
    rating: 4.9,
    reviews: 1245,
    description: 'The ultimate iPhone featuring a titanium design, Action button, and the most powerful chip ever in a smartphone.',
    specs: {
      Display: '6.7-inch Super Retina XDR OLED',
      Processor: 'A17 Pro chip',
      Camera: '48MP Main | 12MP Ultra Wide | 12MP Telephoto',
      Battery: 'Up to 29 hours video playback'
    },
    isNew: true,
    featured: true
  },
  {
    id: 'p2',
    name: 'MacBook Pro 16" - M3 Max, 36GB RAM, 1TB SSD',
    price: 13499,
    image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?q=80&w=1926&auto=format&fit=crop',
    category: 'Laptops',
    brand: 'Apple',
    rating: 5.0,
    reviews: 342,
    description: 'The most advanced Mac laptop for demanding workflows.',
    specs: {
      Display: '16.2-inch Liquid Retina XDR display',
      Processor: 'Apple M3 Max chip',
      Memory: '36GB unified memory',
      Storage: '1TB SSD'
    },
    featured: true
  },
  {
    id: 'p3',
    name: 'Sony PlayStation 5 Console',
    price: 1999,
    originalPrice: 2199,
    image: 'https://images.unsplash.com/photo-1606813907291-d86efa9b94db?q=80&w=2074&auto=format&fit=crop',
    category: 'Gaming Consoles',
    brand: 'Sony',
    rating: 4.8,
    reviews: 5120,
    description: 'Experience lightning-fast loading, deeper immersion, and an all-new generation of incredible PlayStation games.',
    specs: {
      Storage: '825GB Custom NVMe SSD',
      Resolution: 'Up to 4K 120Hz',
      Audio: 'Tempest 3D AudioTech'
    },
    featured: true
  },
  {
    id: 'p4',
    name: 'Sony WH-1000XM5 Wireless Noise Canceling Headphones',
    price: 1399,
    image: 'https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?q=80&w=1976&auto=format&fit=crop',
    category: 'Headphones & Earbuds',
    brand: 'Sony',
    rating: 4.7,
    reviews: 890,
    description: 'Industry-leading noise cancelation and exceptional sound quality.',
    specs: {
      Battery: 'Up to 30 hours',
      WaterResistance: 'No',
      Connectivity: 'Bluetooth 5.2'
    }
  },
  {
    id: 'p5',
    name: 'Samsung Galaxy S24 Ultra - 512GB, Titanium Black',
    price: 5099,
    originalPrice: 5399,
    image: 'https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?q=80&w=2071&auto=format&fit=crop',
    category: 'Smartphones',
    brand: 'Samsung',
    rating: 4.9,
    reviews: 672,
    description: 'Welcome to the era of mobile AI. With Galaxy S24 Ultra in your hands, you can unleash whole new levels of creativity, productivity and possibility.',
    specs: {
      Display: '6.8-inch Dynamic AMOLED 2X',
      Processor: 'Snapdragon 8 Gen 3',
      Camera: '200MP Main | 50MP Periscope | 12MP Ultra Wide | 10MP Telephoto',
      Battery: '5000 mAh'
    },
    isNew: true,
    featured: true
  },
  {
    id: 'p6',
    name: 'LG 27" UltraGear OLED QHD Gaming Monitor',
    price: 3699,
    image: 'https://images.unsplash.com/photo-1527443154391-507e9dc6c5cc?q=80&w=2070&auto=format&fit=crop',
    category: 'Monitors',
    brand: 'LG',
    rating: 4.8,
    reviews: 124,
    description: 'Born to game. 240Hz refresh rate and 0.03ms response time on an OLED display.',
    specs: {
      Size: '27 inch',
      Resolution: '2560 x 1440',
      RefreshRate: '240Hz',
      PanelType: 'OLED'
    }
  },
  {
    id: 'p7',
    name: 'Apple Watch Series 9 - 45mm, Midnight',
    price: 1599,
    image: 'https://images.unsplash.com/photo-1579586337278-3befd40fd17a?q=80&w=2072&auto=format&fit=crop',
    category: 'Smart Watches',
    brand: 'Apple',
    rating: 4.8,
    reviews: 430,
    description: 'Smarter. Brighter. Mightier. With the S9 chip, double tap gesture, and a brighter display.',
    specs: {
      Display: 'Always-On Retina display',
      Processor: 'S9 SiP',
      Battery: 'Up to 18 hours',
      WaterResistance: 'Swimproof 50m'
    },
    isNew: true
  },
  {
    id: 'p8',
    name: 'ASUS ROG Zephyrus G14 (2024)',
    price: 7499,
    image: 'https://images.unsplash.com/photo-1603302576837-37561b2e2302?q=80&w=2068&auto=format&fit=crop',
    category: 'Laptops',
    brand: 'ASUS',
    rating: 4.7,
    reviews: 189,
    description: 'Ultra-portable gaming laptop with OLED display and powerful AMD Ryzen processor.',
    specs: {
      Display: '14-inch 3K OLED 120Hz',
      Processor: 'AMD Ryzen 9 8945HS',
      Memory: '32GB LPDDR5X',
      Graphics: 'NVIDIA GeForce RTX 4070'
    }
  }
];
