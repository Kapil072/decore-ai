# डोर Creation — Premium Indian Ethnic Wear

> **Important:** [github.com/Kapil072/decore-ai](https://github.com/Kapil072/decore-ai) is your **code repository** (files + README). It is **not** your live website.  
> To put the store online, deploy to **Vercel** (free) — steps below.

E-commerce storefront for **Dor Creation** (Indore): kurtas, kurta sets, lehengas, sarees, and co-ord sets.

## Deploy your live website (Vercel)

1. Go to [vercel.com](https://vercel.com) and sign in with **GitHub**.
2. Click **Add New Project** → import **`Kapil072/decore-ai`**.
3. Vercel auto-detects Next.js. Click **Deploy** (defaults are fine).
4. After deploy, open the URL Vercel gives you (e.g. `decore-ai.vercel.app`) — that is your **live site**.
5. In Vercel → **Settings → Environment Variables**, add:

| Variable | Value |
|----------|--------|
| `NEXTAUTH_SECRET` | Any long random string |
| `NEXTAUTH_URL` | Your Vercel URL (e.g. `https://decore-ai.vercel.app`) |
| `DATABASE_URL` | `file:./prisma/dev.db` (optional; shop works without DB) |

Redeploy after adding variables.

**Custom domain:** Vercel → Project → **Domains** → add your domain.

---

## Local development

```bash
git clone https://github.com/Kapil072/decore-ai.git
cd decore-ai
npm install
cp .env.example .env
# Edit .env — set NEXTAUTH_SECRET
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

Optional (database + admin):

```bash
npx prisma migrate dev
npx prisma db seed
```

## Features

- Mobile-friendly shop, wishlist, cart
- Razorpay + WhatsApp ordering
- Admin dashboard (needs database)

## Tech stack

Next.js 16 · React 19 · Tailwind CSS 4 · Prisma · NextAuth · Razorpay

## Contact

- WhatsApp: +91-7976521214 / +91-9039174549
- Instagram: [@dor_creation_indore](https://www.instagram.com/dor_creation_indore)

© Dor Creation, Indore.
