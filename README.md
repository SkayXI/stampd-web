# Stampd — Web

> Digital wallet loyalty cards for coffee shops in Egypt & MENA.

The web app for **Stampd** — a SaaS platform that gives every coffee shop a branded digital loyalty card living inside Apple Wallet and Google Wallet. No app download. No paper cards. Just scan, stamp, and keep customers coming back.

---

## Stack

| Layer | Tech |
|---|---|
| Framework | Next.js 14 (App Router) |
| Styling | Tailwind CSS + CSS custom properties |
| Database | PostgreSQL via Supabase + Prisma ORM |
| Wallet passes | PassKit API |
| WhatsApp campaigns | Meta Cloud API |
| Hosting | Vercel |

---

## Project structure

```
web/
├── app/
│   ├── (marketing)/        Landing page
│   ├── (dashboard)/        Shop owner dashboard (coming in V2)
│   └── api/
│       ├── stamp/          POST — add a stamp after barista scan
│       ├── customer/       POST — register new customer on first scan
│       └── campaign/       POST — send WhatsApp campaign
├── components/
│   ├── marketing/          Landing page sections
│   └── ui/                 Shared UI primitives
├── hooks/                  Custom React hooks
├── lib/
│   ├── db.ts               Prisma client singleton
│   ├── passkit.ts          PassKit API — pass creation & updates
│   └── whatsapp.ts         WhatsApp Business API — bulk send
└── prisma/
    └── schema.prisma       Full database schema
```

---

## Getting started

```bash
# 1. Install dependencies
npm install

# 2. Set up environment variables
cp .env.example .env
# Fill in your keys (Supabase, PassKit, WhatsApp)

# 3. Push the database schema
npx prisma db push

# 4. Start the dev server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

---

## Scripts

| Command | Description |
|---|---|
| `npm run dev` | Start local dev server |
| `npm run build` | Production build |
| `npm run lint` | ESLint check |
| `npm run db:push` | Push Prisma schema to DB |
| `npm run db:studio` | Open Prisma Studio |

---

## Deploy

Deployed on **Vercel**. Every push to `main` triggers a production deployment automatically.

---

*Stampd — Loyalty, redefined. Built in Cairo.*
