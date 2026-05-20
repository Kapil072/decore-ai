import { products } from '@/data/products';

export function generateStaticParams() {
  return products.map(p => ({ slug: p.slug }));
}

export default function ProductSlugLayout({ children }: { children: React.ReactNode }) {
  return children;
}
