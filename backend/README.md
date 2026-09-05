# Backend - Prediction Platform

Node.js/Express API backend for the Prediction Platform.

## Installation

```bash
npm install
```

## Setup

1. Create `.env` file from `.env.example`
2. Configure your database credentials
3. Run migrations: `npm run migrate:up`
4. Seed data: `psql prediction_platform < ../database/seed.sql`

## Environment Variables

```env
# Server
PORT=5000
NODE_ENV=development

# Database
DB_HOST=localhost
DB_PORT=5432
DB_NAME=prediction_platform
DB_USER=postgres
DB_PASSWORD=your_password

# JWT
JWT_SECRET=your_jwt_secret_key
JWT_EXPIRE=7d
REFRESH_TOKEN_SECRET=your_refresh_token_secret

# Paystack
PAYSTACK_SECRET_KEY=sk_test_...
PAYSTACK_PUBLIC_KEY=pk_test_...

# Frontend URL
FRONTEND_URL=http://localhost:5173
```

## Development

```bash
npm run dev
```

Server runs on `http://localhost:5000`

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `POST /api/auth/refresh` - Refresh JWT token
- `GET /api/auth/profile` - Get current user profile

### Predictions
- `GET /api/predictions` - Get all open predictions
- `POST /api/predictions` - Create new prediction
- `GET /api/predictions/user` - Get user's predictions
- `GET /api/predictions/:id` - Get prediction details

### Leaderboard
- `GET /api/leaderboard` - Get global leaderboard
- `GET /api/leaderboard/user-rank` - Get current user rank

### Payments (Paystack)
- `POST /api/payments/initialize` - Initialize Paystack payment
- `POST /api/payments/verify` - Verify payment
- `GET /api/payments/history` - Get payment history

### Events
- `GET /api/events` - Get all open events
- `GET /api/events/:id` - Get event details
- `POST /api/events` - Create event (admin only)
- `PATCH /api/events/:id/close` - Close event and determine result (admin only)

### Users
- `GET /api/users/profile` - Get user profile
- `PUT /api/users/profile` - Update user profile
- `GET /api/users/stats` - Get user statistics

## Project Structure

```
├── server.js              # Entry point
├── config/               # Configuration files
├── middleware/           # Express middleware
├── routes/              # API routes
├── models/              # Database models
└── migrations/          # Database migrations
```

## Database

### Create Database
```bash
createdb prediction_platform
```

### Run Migrations
```bash
psql prediction_platform < ../database/schema.sql
```

### Seed Data
```bash
psql prediction_platform < ../database/seed.sql
```

## Testing

```bash
npm test
```

## Deployment

### Deploy on Railway.app

1. Push to GitHub
2. Go to [railway.app](https://railway.app)
3. Create new project from GitHub repository
4. Select `backend` directory
5. Add PostgreSQL database
6. Set environment variables
7. Railway will auto-deploy

See [DEPLOYMENT.md](../DEPLOYMENT.md) for detailed instructions.

## Paystack Integration

### Setup Paystack Account

1. Sign up at [paystack.com](https://paystack.com)
2. Get your Secret Key and Public Key from dashboard
3. Add to `.env` as `PAYSTACK_SECRET_KEY` and `PAYSTACK_PUBLIC_KEY`

### Payment Flow

1. User makes prediction and initiates payment
2. Backend calls `POST /api/payments/initialize` with amount
3. Paystack returns payment link
4. Frontend redirects user to Paystack payment page
5. After payment, backend verifies with `POST /api/payments/verify`
6. Prediction is confirmed in database

## Socket.io Events

Real-time updates via WebSocket:

- `prediction:created` - New prediction submitted
- `prediction:updated` - Prediction status changed
- `leaderboard:updated` - Leaderboard scores updated
- `event:closed` - Event closed with result
- `payment:confirmed` - Payment verified

## Error Handling

All endpoints return standardized error responses:

```json
{
  "error": "Error message",
  "statusCode": 400,
  "timestamp": "2024-01-01T00:00:00Z"
}
```

## Rate Limiting

Rate limiting is enabled on payment endpoints:
- 10 requests per minute for `/api/payments/*`
- 20 requests per minute for other endpoints

## CORS

CORS is configured to allow requests from:
- Development: `http://localhost:5173`
- Production: Your frontend domain (set via `FRONTEND_URL`)
