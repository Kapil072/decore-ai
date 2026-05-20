import { NextResponse } from 'next/server';
import { products, categories } from '@/data/products';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const category = searchParams.get('category') || 'all';
  const search   = searchParams.get('search')   || '';

  let result = [...products];

  if (category && category !== 'all') {
    result = result.filter(p => p.category === category);
  }

  if (search.trim()) {
    const q = search.toLowerCase();
    result = result.filter(p =>
      p.name.toLowerCase().includes(q)     ||
      p.fabric.toLowerCase().includes(q)   ||
      p.category.toLowerCase().includes(q) ||
      (p.tag && p.tag.toLowerCase().includes(q))
    );
  }

  return NextResponse.json({
    products: result,
    total:    result.length,
    categories,
  });
}
