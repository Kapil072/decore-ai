import { PrismaClient } from '@prisma/client';
import { products } from '../src/data/products';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log('Clearing old data...');
  await prisma.productReview.deleteMany();
  await prisma.productSize.deleteMany();
  await prisma.productColor.deleteMany();
  await prisma.productCareInstruction.deleteMany();
  await prisma.product.deleteMany();
  await prisma.user.deleteMany();

  console.log('Seeding products...');
  for (const p of products) {
    await prisma.product.create({
      data: {
        id: p.id,
        slug: p.slug,
        name: p.name,
        category: p.category,
        price: p.price,
        originalPrice: p.originalPrice || null,
        tag: p.tag || null,
        tagType: p.tagType || null,
        description: p.description,
        longDescription: p.longDescription,
        accent: p.accent,
        bgColor: p.bgColor,
        icon: p.icon,
        fabric: p.fabric,
        inStock: p.inStock,
        rating: p.rating,
        reviewCount: p.reviewCount,
        sizes: {
          create: p.sizes.map(size => ({ size }))
        },
        colors: {
          create: p.colors.map(color => ({
            name: color.name,
            hex: color.hex,
            available: color.available
          }))
        },
        careInstructions: {
          create: p.careInstructions.map(instruction => ({ instruction }))
        },
        reviews: {
          create: p.reviews.map(review => ({
            name: review.name,
            location: review.location,
            rating: review.rating,
            date: review.date,
            text: review.text,
            verified: review.verified
          }))
        }
      }
    });
  }

  console.log('Creating admin user...');
  const hashedPassword = await bcrypt.hash('admin123', 10);
  await prisma.user.create({
    data: {
      name: 'Admin',
      email: 'admin@dorcreation.com',
      password: hashedPassword,
      role: 'ADMIN'
    }
  });

  console.log('Seeding finished!');
}

main()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
