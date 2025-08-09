
# Pickle Pot — Web App (PWA)
Mobile‑friendly Next.js template for running community pickleball “pots”:
- Create pots with buy‑ins & max players
- Join roster (stubbed payment)
- Live roster & total pot
- Email magic‑link sign‑in (Supabase)
- Deployable to Vercel

## 1) Create a Supabase project
- Add tables (SQL editor):
```sql
create table if not exists pots (
  id uuid primary key default gen_random_uuid(),
  created_at timestamp with time zone default now(),
  owner_id uuid,
  name text not null,
  buy_in numeric not null default 10,
  max_players int not null default 16
);
create table if not exists entries (
  id uuid primary key default gen_random_uuid(),
  created_at timestamp with time zone default now(),
  pot_id uuid references pots(id) on delete cascade,
  name text
);
```

## 2) Environment variables
Create `.env.local`:
```env
NEXT_PUBLIC_SUPABASE_URL=YOUR_URL
NEXT_PUBLIC_SUPABASE_ANON_KEY=YOUR_ANON
```

## 3) Dev
```bash
npm i
npm run dev
# open http://localhost:5173
```

## 4) Stripe (optional)
Wire `/app/api/checkout/route.ts` to create a Checkout Session for `buy_in`.
- Add `STRIPE_SECRET_KEY` to `.env.local`
- Use `stripe.checkout.sessions.create(...)`

## 5) Deploy
- Push to GitHub → Import in Vercel → add env vars.
- Add Supabase site URL as auth redirect.
