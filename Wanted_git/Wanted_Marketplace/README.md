# Wanted — Everything Marketplace (MVP starter)

Wanted is a blue-and-brown marketplace concept combining:
- Local shops and supermarkets (groceries, household essentials, personal care)
- Restaurants and prepared food
- Customer shopping and order tracking
- Shop/restaurant partner portal
- Supplier portal
- Delivery partner portal
- Admin portal

This repository is a **runnable MVP starter**, not a production-ready global commerce platform. It includes a working responsive frontend demo and a Node/Express API with MongoDB models and example endpoints. Real payments, Google Maps keys, SMS/OTP, masked calling, identity verification, tax, refunds, food-safety compliance, and production security must be configured and tested with providers in each launch market.

## Brand
- Primary blue: `#1769AA`
- Deep blue: `#0B2D48`
- Warm brown: `#8B5E3C`
- Sand: `#F4EBDD`

## Requirements
- Node.js 20+
- npm
- MongoDB 7+ (local or hosted)

## Run the API
```bash
cd server
cp .env.example .env
npm install
npm run dev
```
API defaults to `http://localhost:5000`. Health check: `GET http://localhost:5000/api/health`.

## Run the frontend
In a second terminal:
```bash
cd client
npm install
npm run dev
```
Open the URL printed by Vite (usually `http://localhost:5173`).

The frontend starts with a role-selection screen: Customer opens the shopping UI without sign-in; Supplier and Delivery open demo login screens and dashboards. Demo credentials are displayed on those login screens. These are UI-only demo credentials and are NOT secure authentication. The frontend currently uses demo catalog data so it can be previewed without API credentials. Set `VITE_API_URL=http://localhost:5000/api` in `client/.env` to point it at the API.

## Role-selection demo credentials
The app displays the current demo credentials on the Supplier and Delivery login screens. For convenience:
- Supplier user ID: `supplier-demo`
- Delivery user ID: `delivery-demo`
- Password for both: `WantedDemo123!`

These credentials only unlock the frontend prototype. They are not validated by the API and must never be used for a public deployment. Implement server-side authentication, hashed passwords or a trusted identity provider, sessions, and role authorization before launch.

## Included API endpoints
- `GET /api/health`
- `GET /api/products?category=&type=&q=`
- `POST /api/products` (partner/admin; authentication placeholder to be completed)
- `POST /api/orders`
- `GET /api/orders/:id`
- `PATCH /api/orders/:id/status`
- `GET /api/shops`
- `POST /api/shops`
- `POST /api/suppliers`
- `POST /api/delivery/location`

## Before real-world launch — required work
1. Implement production authentication (OTP/email, refresh tokens, account recovery, rate limits).
2. Add role/tenant authorization to every partner/admin endpoint; never trust a role supplied by the browser.
3. Integrate a payment provider (e.g. a locally approved PhonePe/Paytm/UPI/card gateway). Use provider-hosted/tokenized checkout; never store raw card numbers or CVVs.
4. Add COD reconciliation, refunds, disputes, webhook signature validation, idempotency keys, and payment ledger.
5. Configure Google Maps Platform with billing, key restrictions, consent, location permissions, and quota limits.
6. Add delivery assignment/dispatch, route/ETA services, background location updates, and access control for active orders.
7. Integrate a compliant masked-call provider; simple UI number-hiding does not mask telephone calls.
8. Add SMS/WhatsApp/email notifications, monitoring, backups, audit logs, secrets management, and incident response.
9. Localize tax, currency, privacy, consumer-protection, food-safety, accessibility, and marketplace regulations per country/region.
10. Load-test, security-test, and complete store review before public release.

## Suggested product strategy
Start with one city and a narrow launch category mix. Validate fulfilment, shop onboarding, delivery economics, returns/refunds, and support before expanding country-by-country. The architecture is intended to evolve toward separate services only when traffic and operational complexity justify them.

## Reference inspiration
Wanted uses familiar marketplace patterns—discovery, carts, partner dashboards, food ordering, rapid essentials, and delivery tracking—without copying another company's branding or proprietary UI.
