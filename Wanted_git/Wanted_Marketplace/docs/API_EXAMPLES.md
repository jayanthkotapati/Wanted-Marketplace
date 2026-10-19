# API examples

Base URL: `http://localhost:5000/api`

## Health
```bash
curl http://localhost:5000/api/health
```

## Search products
```bash
curl "http://localhost:5000/api/products?q=milk&limit=10"
```

## Register a shop (unverified)
```bash
curl -X POST http://localhost:5000/api/shops \
  -H "Content-Type: application/json" \
  -d '{"name":"Green Basket","kind":"grocery","address":"12 Market Road","city":"Bengaluru","country":"India"}'
```

## Register a supplier (unverified)
```bash
curl -X POST http://localhost:5000/api/suppliers \
  -H "Content-Type: application/json" \
  -d '{"businessName":"Fresh Foods Wholesale","city":"Bengaluru","categories":["produce","dairy"]}'
```

## Create a product
Use the shop `_id` returned by the shop endpoint:
```bash
curl -X POST http://localhost:5000/api/products \
  -H "Content-Type: application/json" \
  -d '{"name":"Bananas","category":"Fresh produce","type":"grocery","price":45,"unit":"6 pcs","stock":30,"shop":"REPLACE_WITH_SHOP_ID"}'
```

## Create an order
Replace product and shop IDs with actual MongoDB IDs:
```bash
curl -X POST http://localhost:5000/api/orders \
  -H "Content-Type: application/json" \
  -d '{"shopId":"REPLACE_WITH_SHOP_ID","items":[{"productId":"REPLACE_WITH_PRODUCT_ID","quantity":2}],"deliveryAddress":"12 Example Street, Bengaluru","paymentMethod":"cod"}'
```

These endpoints are intentionally a development scaffold. Do not expose them publicly until authentication, authorization, validation, abuse protection, payment processing, and audit controls are implemented.
