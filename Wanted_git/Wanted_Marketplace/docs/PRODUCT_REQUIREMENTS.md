# Wanted Product Requirements (global-ready direction)

## Product promise
One marketplace for local retail, supermarkets, restaurants, quick essentials, and wholesale supply. Inspired by broad market patterns from food delivery, rapid commerce, and large e-commerce marketplaces; do not copy competitors' proprietary assets, names, visual identity, or exact screens.

## Core experiences
### Customer
- Address selection and serviceability before promising delivery time.
- Search across products, stores, cuisines, and categories.
- Browse by store, category, availability, dietary filters, price, rating, and delivery estimate.
- Cart supports a single merchant in MVP; multi-merchant basket requires separate fulfilment groups and fees.
- Transparent substitutions, out-of-stock choices, taxes, service/delivery fees, tip, discounts, and final total.
- COD where operationally supported; UPI, wallets, cards and other local methods through compliant providers.
- Order timeline, authorized live location, ETA, proof-of-delivery OTP, cancellation/returns/refunds, support, ratings.
- Accessible design, localization, currency and language preferences.

### Merchant (shop, supermarket, restaurant)
- KYB/business verification, store hours, delivery radius, menu/catalog, prices, inventory, allergens and product details.
- Order accept/reject with reason; prep-time estimates; pause orders; refunds and disputes workflow.
- Payout ledger, commission and tax statements, promotion controls, analytics.
- Restaurant-specific food safety, allergen, preparation, packaging and order-hand-off workflows.

### Supplier
- Verified business onboarding, wholesale catalog, minimum order quantity, tiered pricing, lead times, purchase orders, invoices, shipment status and retailer credit rules where lawful.

### Delivery partner
- Identity/vehicle verification, training and safety checklist, online/offline availability, dispatch offers, route navigation, pickup/drop-off, support, earnings, cash reconciliation.
- Location sharing only during an active assigned delivery, with clear notice and retention limits.
- Customer and partner telephone numbers hidden through a real proxy-call provider; no direct exposure in UI or logs.

### Admin and operations
- Role-based access, audit trails, merchant approval, catalogue moderation, disputes, refunds, fraud controls, serviceability, fees, commissions, incident management and customer support.
- Operational dashboards for late orders, cancellations, partner availability, payment reconciliation, stock issues and abuse reports.

## Non-functional requirements
- Security: OWASP guidance, secure sessions, MFA for admins, least privilege, secrets manager, encryption in transit/at rest, rate limits, audit logs, vulnerability scanning and penetration testing.
- Reliability: idempotent checkout, payment webhook signature verification, retries with backoff, dead-letter handling, backups and restore tests.
- Performance: CDN for images/static content, caching for discovery, indexes, pagination, load tests and SLOs.
- Privacy: data minimization, consent, purpose limitation, retention/deletion controls, access logging and regional privacy-law review.
- Global: currency/language/timezone, country-specific payment methods, tax/receipts, address formats, consumer law, food safety, accessibility and data residency where applicable.
- Maps: Google Maps Platform coverage and terms vary by region; use serviceability checks and a fallback address-entry flow.
- Payments: provider availability and licensing differ by country. Never store raw card data; use tokenization/hosted checkout and validated webhooks.
- Regulated categories: medicines, alcohol and other controlled goods require country-specific eligibility and licensing; keep disabled until reviewed and approved.

## Recommended delivery plan
1. Prototype & discovery in one city (4–6 weeks): user interviews, merchant interviews, serviceability, unit economics, click-through demo.
2. MVP (8–14 weeks depending on team): customer web/mobile, merchant portal, delivery workflow, one payment provider, map/ETA, support/admin basics.
3. Pilot (4–8 weeks): limited zone, limited merchants, operational monitoring, incident runbooks, reconciliation and support.
4. Scale: multi-city operations, regional payment methods, supplier procurement, promotions, analytics and service decomposition only as needed.

Time estimates are planning ranges, not guarantees. Local legal, payment, food-safety and telecom review is required before launch.
