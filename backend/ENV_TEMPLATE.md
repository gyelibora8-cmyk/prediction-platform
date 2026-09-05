# Environment Variables Example

Copy this file to `.env` and fill in your actual values.

```bash
# Server
PORT=5000
NODE_ENV=development

# Database
DB_HOST=localhost
DB_PORT=5432
DB_NAME=prediction_platform
DB_USER=postgres
DB_PASSWORD=your_secure_password

# JWT
JWT_SECRET=your_very_long_random_secret_key_change_this
JWT_EXPIRE=7d
REFRESH_TOKEN_SECRET=your_very_long_random_refresh_secret_key

# Stripe
STRIPE_SECRET_KEY=sk_test_your_stripe_secret_key
STRIPE_PUBLISHABLE_KEY=pk_test_your_stripe_publishable_key

# Frontend URL
FRONTEND_URL=http://localhost:5173

# Email (optional)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your_email@gmail.com
SMTP_PASSWORD=your_app_password
```

## How to Generate Secrets

### JWT Secret
```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

### Generate via OpenSSL
```bash
openssl rand -hex 32
```
