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

## Development

```bash
npm run dev
```

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

### Payments
- `POST /api/payments/create-intent` - Create Stripe payment intent
- `POST /api/payments/confirm` - Confirm payment
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
