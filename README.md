# डोर Creation — Premium Indian Ethnic Wear

## Live website (hosted from this repo)

After GitHub Actions runs, your store is live at:

**https://kapil072.github.io/decore-ai/**

| What | URL |
|------|-----|
| **Live shop** | https://kapil072.github.io/decore-ai/ |
| **Code on GitHub** | https://github.com/Kapil072/decore-ai |

> GitHub’s repo page only shows this README. The **live site** is the link above.

### One-time setup (if the live link does not work yet)

1. Open **https://github.com/Kapil072/decore-ai/settings/pages**
2. Under **Build and deployment** → **Source**, choose **GitHub Actions**
3. Push to `main` (or run the **Deploy live site to GitHub Pages** workflow manually)

Every push to `main` redeploys the site automatically.

---

## Local development

```bash
git clone https://github.com/Kapil072/decore-ai.git
cd decore-ai
npm install
cp .env.example .env
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Features

- Mobile-friendly shop, wishlist, cart
- WhatsApp ordering (works on live site)
- Razorpay + admin (local / Vercel only — not on GitHub Pages)

## Full server deploy (Vercel — optional)

For Razorpay, admin, and database: deploy on [Vercel](https://vercel.com) from this repo and set `NEXTAUTH_SECRET`, `DATABASE_URL`, and Razorpay keys.

## Contact

- WhatsApp: +91-7976521214 / +91-9039174549
- Instagram: [@dor_creation_indore](https://www.instagram.com/dor_creation_indore)

© Dor Creation, Indore.
