# Security Policy

This project is an MVP starter and is not production-ready. Do not use it to process real payments or sensitive customer information without a security review.

## Reporting a vulnerability
Please report security concerns privately to the repository owner rather than publishing credentials, personal data, or exploit details in a public issue. Add your preferred contact details to this file after publishing the repository.

## Before deployment
- Keep `.env` files and provider secrets out of Git.
- Replace demo-only login behavior with server-side authentication and authorization.
- Validate and rate-limit API requests.
- Verify payment webhooks and never store raw card numbers or CVVs.
- Restrict map/API keys and protect live location data.
