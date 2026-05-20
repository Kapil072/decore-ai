export interface ProductReview {
  id: string; name: string; location: string;
  rating: number; date: string; text: string; verified: boolean;
}
export interface ProductColor { name: string; hex: string; available: boolean; }

export interface Product {
  id: string; slug: string; name: string; category: string;
  price: number; originalPrice?: number;
  tag?: string; tagType?: 'gold' | 'terra' | 'new';
  description: string; longDescription: string;
  accent: string; bgColor: string; icon: string; fabric: string;
  sizes: string[]; inStock: boolean;
  colors: ProductColor[];
  careInstructions: string[];
  rating: number; reviewCount: number;
  reviews: ProductReview[];
}

export const categories = [
  { id: 'all',          label: 'All',           icon: '◈' },
  { id: 'kurta-sets',   label: 'Kurta Sets',    icon: '✦' },
  { id: 'kurtas',       label: 'Kurtas',        icon: '◎' },
  { id: 'co-ord',       label: 'Co-ord Sets',   icon: '⬡' },
  { id: 'lehengas',     label: 'Lehengas',      icon: '❋' },
  { id: 'sarees',       label: 'Sarees',        icon: '☽' },
  { id: 'indo-western', label: 'Indo-Western',  icon: '◇' },
];

export const products: Product[] = [
  {
    id: 'p1', slug: 'rani-pink-embroidered-kurta-set',
    name: 'Rani Pink Embroidered Kurta Set',
    category: 'kurta-sets', price: 2799, originalPrice: 3499,
    tag: 'Bestseller', tagType: 'gold',
    description: 'Exquisite rani pink kurta set with intricate floral thread embroidery.',
    longDescription: 'Fall in love with this stunning Rani Pink Embroidered Kurta Set, crafted from premium Mul Chanderi Silk. The kurta features delicate floral thread embroidery at the neckline and hemline, paired with matching wide-leg palazzo pants and a sheer dupatta with embroidered borders. Perfect for festive occasions, family gatherings, or any celebration where you want to look effortlessly elegant.',
    accent: 'linear-gradient(135deg, #C2185B40 0%, #1A1410 70%)',
    bgColor: '#C2185B', icon: '✿', fabric: 'Mul Chanderi Silk',
    sizes: ['XS','S','M','L','XL','XXL'], inStock: true,
    colors: [{ name: 'Rani Pink', hex: '#C2185B', available: true }, { name: 'Coral Rose', hex: '#E91E63', available: true }, { name: 'Dusty Mauve', hex: '#AD1457', available: false }],
    careInstructions: ['Dry clean recommended', 'Do not bleach', 'Iron on low heat with cloth cover', 'Store in a cool dry place'],
    rating: 4.8, reviewCount: 124,
    reviews: [
      { id: 'r1', name: 'Priya Sharma', location: 'Mumbai', rating: 5, date: '12 Apr 2025', text: 'Absolutely loved this kurta set! The fabric quality is superb and the embroidery is so beautiful. Got so many compliments at the wedding.', verified: true },
      { id: 'r2', name: 'Ritu Agarwal', location: 'Delhi', rating: 5, date: '8 Mar 2025', text: 'Perfect stitching, exactly as shown. The dupatta is gorgeous. Will order again!', verified: true },
      { id: 'r3', name: 'Meena Patel', location: 'Surat', rating: 4, date: '1 Feb 2025', text: 'Good quality fabric. The pink shade is very vibrant. Size runs slightly small, order one size up.', verified: true },
    ],
  },
  {
    id: 'p2', slug: 'mustard-floral-co-ord-set',
    name: 'Mustard Floral Co-ord Set',
    category: 'co-ord', price: 3299, originalPrice: 4200,
    tag: 'New', tagType: 'new',
    description: 'Vibrant mustard co-ord set with all-over floral motifs.',
    longDescription: 'A fresh take on contemporary ethnic fashion, this Mustard Floral Co-ord Set features a cropped kurta top paired with matching flared palazzo pants. The all-over floral print on soft Georgette fabric creates a breezy, feminine look ideal for daytime events, office wear, or casual outings. Lightweight and breathable — perfect for the Indian summer.',
    accent: 'linear-gradient(135deg, #F9A82540 0%, #1A1410 70%)',
    bgColor: '#F9A825', icon: '❀', fabric: 'Georgette',
    sizes: ['XS','S','M','L','XL'], inStock: true,
    colors: [{ name: 'Mustard', hex: '#F9A825', available: true }, { name: 'Sage Green', hex: '#7CB342', available: true }],
    careInstructions: ['Hand wash in cold water', 'Do not wring', 'Dry in shade', 'Steam iron on low'],
    rating: 4.6, reviewCount: 87,
    reviews: [
      { id: 'r1', name: 'Sneha Patel', location: 'Ahmedabad', rating: 5, date: '5 May 2025', text: 'Trendy yet traditional. The floral print is crisp and fabric does not wrinkle. Perfect for office!', verified: true },
      { id: 'r2', name: 'Kavya Nair', location: 'Kochi', rating: 4, date: '20 Apr 2025', text: 'Good quality. Stitching is neat. Slightly thin fabric but perfect for summer.', verified: true },
    ],
  },
  {
    id: 'p3', slug: 'emerald-green-banarasi-lehenga',
    name: 'Emerald Green Banarasi Lehenga',
    category: 'lehengas', price: 12999, originalPrice: 16000,
    tag: 'Premium', tagType: 'terra',
    description: 'Stunning emerald green Banarasi weave lehenga with zari border.',
    longDescription: 'Make a grand entrance in this breathtaking Emerald Green Banarasi Lehenga. Woven from authentic Banarasi silk with intricate zari (gold thread) patterns throughout, this lehenga features a heavily embroidered waistband, voluminous skirt, matching choli blouse with back tie-up, and a stunning dupatta with scalloped golden border. A masterpiece for weddings, sangeets, and festive celebrations.',
    accent: 'linear-gradient(135deg, #1B5E2040 0%, #1A1410 70%)',
    bgColor: '#1B5E20', icon: '✦', fabric: 'Banarasi Silk',
    sizes: ['XS','S','M','L','XL'], inStock: true,
    colors: [{ name: 'Emerald', hex: '#1B5E20', available: true }, { name: 'Royal Blue', hex: '#1A237E', available: true }, { name: 'Deep Wine', hex: '#4A0080', available: true }],
    careInstructions: ['Dry clean only', 'Store in muslin cloth bag', 'Keep away from direct sunlight', 'Do not tumble dry'],
    rating: 4.9, reviewCount: 203,
    reviews: [
      { id: 'r1', name: 'Anita Verma', location: 'Delhi', rating: 5, date: '15 May 2025', text: 'The Banarasi Lehenga is beyond gorgeous! Wore it at my sister\'s wedding and everyone was asking where I got it. 10/10!', verified: true },
      { id: 'r2', name: 'Pooja Singh', location: 'Lucknow', rating: 5, date: '2 Apr 2025', text: 'Authentic Banarasi weave. The zari work is exquisite. Heavy but worth every rupee.', verified: true },
      { id: 'r3', name: 'Divya Kapoor', location: 'Jaipur', rating: 5, date: '18 Mar 2025', text: 'Perfect fit. The emerald color is exactly as shown. Packaging was beautiful too!', verified: true },
    ],
  },
  {
    id: 'p4', slug: 'navy-blue-chikankari-kurta',
    name: 'Navy Blue Chikankari Kurta',
    category: 'kurtas', price: 1899, originalPrice: 2500,
    tag: 'Trending', tagType: 'new',
    description: 'Classic navy blue kurta with authentic Lucknowi Chikankari embroidery.',
    longDescription: 'Discover the timeless beauty of Lucknowi Chikankari in this stunning Navy Blue Kurta. Each piece is hand-embroidered by skilled artisans from Lucknow using traditional white thread work in delicate floral and paisley patterns. The lightweight Mulmul Cotton fabric ensures all-day comfort. Pair with white palazzo, cigarette pants, or jeans for a versatile look.',
    accent: 'linear-gradient(135deg, #1A237E40 0%, #1A1410 70%)',
    bgColor: '#1A237E', icon: '◎', fabric: 'Mulmul Cotton',
    sizes: ['S','M','L','XL','XXL'], inStock: true,
    colors: [{ name: 'Navy Blue', hex: '#1A237E', available: true }, { name: 'Forest Green', hex: '#1B5E20', available: true }, { name: 'Dusty Pink', hex: '#C2185B', available: false }],
    careInstructions: ['Hand wash gently in cold water', 'Use mild detergent', 'Dry flat in shade', 'Iron on reverse side'],
    rating: 4.7, reviewCount: 156,
    reviews: [
      { id: 'r1', name: 'Meera Nair', location: 'Hyderabad', rating: 5, date: '10 May 2025', text: 'The Chikankari work is incredibly well crafted. Authentic hand embroidery — worth every rupee!', verified: true },
      { id: 'r2', name: 'Sunita Rao', location: 'Bangalore', rating: 4, date: '25 Apr 2025', text: 'Beautiful kurta. Very comfortable in summer. The fabric is very breathable.', verified: true },
    ],
  },
  {
    id: 'p5', slug: 'rust-orange-anarkali-set',
    name: 'Rust Orange Anarkali Set',
    category: 'indo-western', price: 4599, originalPrice: 5800,
    tag: 'Bestseller', tagType: 'gold',
    description: 'Floor-length rust orange Anarkali with intricate mirror work.',
    longDescription: 'Turn heads with this dramatic Rust Orange Anarkali Set. The floor-sweeping silhouette features hundreds of hand-applied mirror work pieces that catch the light beautifully. The fitted bodice with deep neckline transitions into a voluminous flared skirt, complete with side slits for ease of movement. Comes with matching churidar pants. A show-stopper for any festive occasion.',
    accent: 'linear-gradient(135deg, #BF360C40 0%, #1A1410 70%)',
    bgColor: '#BF360C', icon: '☽', fabric: 'Heavy Georgette',
    sizes: ['XS','S','M','L','XL'], inStock: true,
    colors: [{ name: 'Rust Orange', hex: '#BF360C', available: true }, { name: 'Terracotta', hex: '#8D4A2A', available: true }],
    careInstructions: ['Dry clean only', 'Handle mirror work gently', 'Store folded flat', 'Avoid direct sunlight'],
    rating: 4.7, reviewCount: 89,
    reviews: [
      { id: 'r1', name: 'Rekha Mehta', location: 'Mumbai', rating: 5, date: '3 May 2025', text: 'Stunning anarkali! The mirror work is beautiful and the rust color is exactly as shown.', verified: true },
    ],
  },
  {
    id: 'p6', slug: 'cream-ivory-kanjivaram-saree',
    name: 'Cream Ivory Kanjivaram Saree',
    category: 'sarees', price: 8999, originalPrice: 11500,
    tag: 'New', tagType: 'new',
    description: 'Pure Kanjivaram silk saree in cream-ivory with rich golden zari border.',
    longDescription: 'Drape yourself in tradition with this Pure Kanjivaram Silk Saree. Woven in the traditional Kanjivaram style from Tamil Nadu, this cream-ivory saree features a rich golden zari border and pallu with intricate temple motifs. The heavy silk fabric has a natural sheen that makes it perfect for South Indian weddings, pujas, and classical dance performances.',
    accent: 'linear-gradient(135deg, #FFF8DC40 0%, #1A1410 70%)',
    bgColor: '#D4AF37', icon: '❋', fabric: 'Pure Kanjivaram Silk',
    sizes: ['One Size'], inStock: true,
    colors: [{ name: 'Cream Gold', hex: '#D4AF37', available: true }, { name: 'Pink Gold', hex: '#C2185B', available: true }],
    careInstructions: ['Dry clean only', 'Store in silk pouch', 'Avoid moisture', 'Air dry after wearing'],
    rating: 4.9, reviewCount: 178,
    reviews: [
      { id: 'r1', name: 'Kavitha Rao', location: 'Bangalore', rating: 5, date: '8 May 2025', text: 'Fast delivery and packaging was beautiful. Pure Kanjivaram silk. Will definitely order again!', verified: true },
      { id: 'r2', name: 'Lalitha Kumar', location: 'Chennai', rating: 5, date: '14 Apr 2025', text: 'Authentic Kanjivaram. The zari border is stunning. Wore it to my daughter\'s wedding — received so many compliments!', verified: true },
    ],
  },
  {
    id: 'p7', slug: 'lavender-palazzo-kurta-set',
    name: 'Lavender Palazzo Kurta Set',
    category: 'kurta-sets', price: 2199, originalPrice: 2800,
    description: 'Soft lavender kurta with wide-leg palazzo and sheer dupatta.',
    longDescription: 'A breath of fresh air, this Lavender Palazzo Kurta Set combines comfort with elegance. The A-line kurta in soft Rayon Slub fabric has subtle textural interest with a straight hemline and side slits. The wide-leg palazzo provides maximum comfort while the sheer dupatta with contrast border adds a festive touch. Great for office parties, day events, or casual celebrations.',
    accent: 'linear-gradient(135deg, #7B1FA240 0%, #1A1410 70%)',
    bgColor: '#7B1FA2', icon: '◇', fabric: 'Rayon Slub',
    sizes: ['XS','S','M','L','XL','XXL'], inStock: true,
    colors: [{ name: 'Lavender', hex: '#7B1FA2', available: true }, { name: 'Sky Blue', hex: '#1565C0', available: true }, { name: 'Mint Green', hex: '#2E7D32', available: true }],
    careInstructions: ['Machine wash cold on gentle cycle', 'Use mild detergent', 'Tumble dry low', 'Warm iron'],
    rating: 4.5, reviewCount: 64,
    reviews: [
      { id: 'r1', name: 'Nisha Gupta', location: 'Pune', rating: 5, date: '22 Apr 2025', text: 'Beautiful lavender color. Very comfortable fabric. The palazzo is very flowy.', verified: true },
    ],
  },
  {
    id: 'p8', slug: 'red-gold-bridal-lehenga',
    name: 'Red & Gold Bridal Lehenga',
    category: 'lehengas', price: 24999, originalPrice: 31000,
    tag: 'Premium', tagType: 'terra',
    description: 'Grand red bridal lehenga with heavy zardozi embroidery.',
    longDescription: 'Your dream bridal look awaits. This Red & Gold Bridal Lehenga is a masterpiece of Indian craftsmanship, featuring heavy zardozi (gold wire) embroidery covering the entire skirt. The rich red color is the perfect bridal hue, complemented by a heavily embroidered choli blouse and a gold dupatta with scalloped border. Includes underskirt. Custom stitching available — contact us via WhatsApp.',
    accent: 'linear-gradient(135deg, #B71C1C40 0%, #D4AF3720 70%)',
    bgColor: '#B71C1C', icon: '♛', fabric: 'Heavy Raw Silk',
    sizes: ['XS','S','M','L','XL'], inStock: true,
    colors: [{ name: 'Bridal Red', hex: '#B71C1C', available: true }, { name: 'Maroon Gold', hex: '#880E4F', available: true }],
    careInstructions: ['Dry clean only', 'Professional storage recommended', 'Do not fold embroidered sections', 'Store in breathable garment bag'],
    rating: 5.0, reviewCount: 312,
    reviews: [
      { id: 'r1', name: 'Priya Kapoor', location: 'Delhi', rating: 5, date: '1 May 2025', text: 'My wedding lehenga from Dorcreation — I felt like a queen! The zardozi work is incredibly detailed. Worth every rupee.', verified: true },
      { id: 'r2', name: 'Ananya Singh', location: 'Jaipur', rating: 5, date: '10 Apr 2025', text: 'Exactly as shown. Heavy and grand. Got so many compliments. Custom stitching was perfect!', verified: true },
      { id: 'r3', name: 'Sakshi Mehta', location: 'Mumbai', rating: 5, date: '5 Mar 2025', text: 'The best bridal lehenga I could find. Dorcreation exceeded all expectations!', verified: true },
    ],
  },
  {
    id: 'p9', slug: 'sea-blue-mul-chanderi-kurta-set',
    name: 'Sea Blue Mul Chanderi Kurta Set',
    category: 'kurta-sets', price: 3100, originalPrice: 3900,
    tag: 'Trending', tagType: 'new',
    description: 'Refreshing sea blue mul chanderi kurta set with pearl embellishments.',
    longDescription: 'Dive into summer in this refreshing Sea Blue Mul Chanderi Kurta Set. The kurta features delicate pearl embellishments at the neckline and sleeves, with intricate cutwork detailing along the hemline. Paired with matching straight-cut pants and a sea blue sheer dupatta with scalloped pearl border. Light, airy, and perfect for summer weddings and festivals.',
    accent: 'linear-gradient(135deg, #00606440 0%, #1A1410 70%)',
    bgColor: '#006064', icon: '✿', fabric: 'Mul Chanderi',
    sizes: ['XS','S','M','L','XL'], inStock: true,
    colors: [{ name: 'Sea Blue', hex: '#006064', available: true }, { name: 'Teal', hex: '#00838F', available: true }],
    careInstructions: ['Dry clean recommended', 'Hand wash in cold if needed', 'Do not soak', 'Iron on reverse'],
    rating: 4.6, reviewCount: 71,
    reviews: [
      { id: 'r1', name: 'Deepa Krishnan', location: 'Bangalore', rating: 5, date: '18 May 2025', text: 'The sea blue color is stunning in person. Pearl embellishments are very elegant.', verified: true },
    ],
  },
  {
    id: 'p10', slug: 'peach-cotton-daily-wear-kurta',
    name: 'Peach Cotton Daily Wear Kurta',
    category: 'kurtas', price: 999, originalPrice: 1400,
    tag: 'Under ₹1K', tagType: 'new',
    description: 'Comfortable everyday peach kurta in 100% cotton.',
    longDescription: 'Your everyday wardrobe essential — this Peach Cotton Kurta is crafted from 100% breathable cotton for maximum comfort. Features subtle embroidery at the neckline, a straight silhouette with side slits, and 3/4 length sleeves. Machine washable and quick-drying, this is the perfect kurta for everyday office wear, college, or casual outings.',
    accent: 'linear-gradient(135deg, #FFAB7640 0%, #1A1410 70%)',
    bgColor: '#FFAB76', icon: '◎', fabric: '100% Cotton',
    sizes: ['XS','S','M','L','XL','XXL'], inStock: true,
    colors: [{ name: 'Peach', hex: '#FFAB76', available: true }, { name: 'White', hex: '#F5F5F5', available: true }, { name: 'Light Yellow', hex: '#FFF176', available: true }],
    careInstructions: ['Machine wash warm', 'Tumble dry low', 'Iron medium heat', 'Do not dry clean'],
    rating: 4.4, reviewCount: 298,
    reviews: [
      { id: 'r1', name: 'Sameera Khan', location: 'Hyderabad', rating: 5, date: '20 May 2025', text: 'Great quality for the price! Very comfortable for daily wear. Colors are bright and did not fade after washing.', verified: true },
      { id: 'r2', name: 'Tanya Reddy', location: 'Chennai', rating: 4, date: '15 May 2025', text: 'Good cotton quality. Stitching is neat. Perfect for office wear.', verified: true },
    ],
  },
  {
    id: 'p11', slug: 'maroon-embroidered-sharara-set',
    name: 'Maroon Embroidered Sharara Set',
    category: 'indo-western', price: 5499, originalPrice: 6800,
    tag: 'New', tagType: 'new',
    description: 'Rich maroon sharara set with heavy thread and sequence embroidery.',
    longDescription: 'Make a bold statement with this Rich Maroon Embroidered Sharara Set. The crop top features all-over thread and sequin embroidery in a geometric pattern, paired with wide-leg sharara pants with matching embroidery at the hem. Comes with a sheer net dupatta. This contemporary indo-western fusion is perfect for sangeets, cocktail parties, and festivals.',
    accent: 'linear-gradient(135deg, #88000040 0%, #1A1410 70%)',
    bgColor: '#880000', icon: '⬡', fabric: 'Net + Satin',
    sizes: ['XS','S','M','L','XL'], inStock: true,
    colors: [{ name: 'Maroon', hex: '#880000', available: true }, { name: 'Bottle Green', hex: '#1B5E20', available: true }],
    careInstructions: ['Dry clean only', 'Handle with care — avoid snags', 'Store flat in tissue paper', 'Steam press only'],
    rating: 4.6, reviewCount: 93,
    reviews: [
      { id: 'r1', name: 'Aisha Shaikh', location: 'Mumbai', rating: 5, date: '11 May 2025', text: 'Wore this to a sangeet — felt like a diva! The sequin work is stunning and heavy.', verified: true },
    ],
  },
  {
    id: 'p12', slug: 'black-ethnic-co-ord-set',
    name: 'Black Ethnic Co-ord Set',
    category: 'co-ord', price: 3799, originalPrice: 4800,
    tag: 'Bestseller', tagType: 'gold',
    description: 'Sleek black ethnic co-ord set with gold zari motifs.',
    longDescription: 'Timeless, elegant, and endlessly versatile — this Black Ethnic Co-ord Set is a wardrobe staple. The classic black Chanderi Silk fabric features subtle gold zari motifs throughout, giving it a festive edge while remaining sophisticatedly simple. The fitted A-line kurta top pairs perfectly with the straight-cut pants. Dress up with gold jewelry or keep it minimal — either way, you will look stunning.',
    accent: 'linear-gradient(135deg, #21212140 0%, #D4AF3710 70%)',
    bgColor: '#212121', icon: '✦', fabric: 'Chanderi Silk',
    sizes: ['XS','S','M','L','XL','XXL'], inStock: true,
    colors: [{ name: 'Black Gold', hex: '#212121', available: true }, { name: 'Navy Gold', hex: '#1A237E', available: true }],
    careInstructions: ['Dry clean recommended', 'Do not wash with colored clothes', 'Iron on low heat', 'Store away from direct light'],
    rating: 4.8, reviewCount: 187,
    reviews: [
      { id: 'r1', name: 'Kritika Joshi', location: 'Pune', rating: 5, date: '6 May 2025', text: 'Perfect blend of tradition and modernity. The gold zari looks gorgeous under lights. Love it!', verified: true },
      { id: 'r2', name: 'Shweta Taneja', location: 'Gurgaon', rating: 5, date: '28 Apr 2025', text: 'Super versatile. Wore it to office Diwali party and to a wedding — looked amazing at both!', verified: true },
    ],
  },
];

export const testimonials = [
  { name: 'Priya Sharma', location: 'Mumbai', text: 'Absolutely loved my Rani Pink Kurta Set! The fabric quality is superb. Got so many compliments at the wedding.', rating: 5, product: 'Rani Pink Embroidered Kurta Set' },
  { name: 'Anita Verma', location: 'Delhi', text: 'The Banarasi Lehenga is beyond gorgeous! Wore it at my sister\'s wedding and everyone was asking where I got it. 10/10!', rating: 5, product: 'Emerald Green Banarasi Lehenga' },
  { name: 'Kavitha Rao', location: 'Bangalore', text: 'Fast delivery and packaging was beautiful. The saree is exactly as described, pure Kanjivaram silk.', rating: 5, product: 'Cream Ivory Kanjivaram Saree' },
  { name: 'Sneha Patel', location: 'Ahmedabad', text: 'The mustard co-ord set is so trendy yet traditional. The floral print is crisp. Perfect for office!', rating: 4, product: 'Mustard Floral Co-ord Set' },
  { name: 'Meera Nair', location: 'Hyderabad', text: 'The Chikankari kurta is incredibly well crafted. You can feel the hand embroidery is authentic.', rating: 5, product: 'Navy Blue Chikankari Kurta' },
];
