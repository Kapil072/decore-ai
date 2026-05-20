# डोर Creation — Premium Indian Ethnic Wear

E-commerce storefront for **Dor Creation** (Indore): kurtas, kurta sets, lehengas, sarees, and co-ord sets. Built with Next.js, with shop, wishlist, cart, Razorpay checkout, and WhatsApp ordering.

**Repository:** [github.com/Kapil072/decore-ai](https://github.com/Kapil072/decore-ai)

## Features

- Responsive, mobile-friendly UI
- Product catalog with filters (category, price, size)
- Shopping cart (local storage) + Razorpay online pay
- WhatsApp order fallback
- Wishlist
- Admin dashboard (NextAuth + Prisma)
- Search overlay

## Tech stack

- [Next.js 16](https://nextjs.org/) (App Router)
- React 19, TypeScript
- Tailwind CSS 4
- Prisma (SQLite)
- NextAuth, Razorpay

## Getting started

### Prerequisites

- Node.js 20+
- npm

### Install & run

```bash
git clone https://github.com/Kapil072/decore-ai.git
cd decore-ai
npm install
npx prisma generate
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

### Environment variables

Create a `.env` file in the project root (never commit this file):

```env
# Database (SQLite example)
DATABASE_URL="file:./dev.db"

# NextAuth
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="your-secret-here"

# Razorpay (optional — for Pay Online)
RAZORPAY_KEY_ID="your_key_id"
RAZORPAY_KEY_SECRET="your_key_secret"
```

Run migrations and seed (first time):

```bash
npx prisma migrate dev
npx prisma db seed
```

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Development server |
| `npm run build` | Production build |
| `npm run start` | Run production server |
| `npm run lint` | ESLint |

## Deploy

Works on [Vercel](https://vercel.com), Netlify, or any Node host that supports Next.js. Set the same environment variables in your hosting dashboard. For production, use a hosted database (e.g. PostgreSQL) instead of local SQLite.

## Contact (store)

- WhatsApp: +91-7976521214 / +91-9039174549
- Instagram: [@dor_creation_indore](https://www.instagram.com/dor_creation_indore)

## License

Private — © Dor Creation, Indore.
