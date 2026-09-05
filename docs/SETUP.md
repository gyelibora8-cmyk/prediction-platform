# Setup Instructions

## Prerequisites

- Node.js 16+ and npm/yarn
- PostgreSQL 12+
- Git
- Stripe account (for payments)

## Environment Variables

### Backend (.env)

```
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

# Stripe
STRIPE_SECRET_KEY=sk_test_...
STRIPE_PUBLISHABLE_KEY=pk_test_...

# Frontend URL
FRONTEND_URL=http://localhost:5173
```

### Frontend (.env)

```
VITE_API_URL=http://localhost:5000
VITE_STRIPE_KEY=pk_test_...
```

## Installation

### 1. Clone Repository

```bash
git clone https://github.com/gyelibora8-cmyk/prediction-platform.git
cd prediction-platform
```

### 2. Database Setup

```bash
# Create database
createdb prediction_platform

# Run migrations
psql prediction_platform < database/schema.sql
psql prediction_platform < database/seed.sql
```

### 3. Backend Setup

```bash
cd backend
npm install
cp .env.example .env
# Edit .env with your credentials
npm run dev
```

### 4. Frontend Setup

```bash
cd frontend
npm install
cp .env.example .env
# Edit .env with your API URL
npm run dev
```

## Running the Application

### Development Mode

**Terminal 1 - Backend:**
```bash
cd backend
npm run dev
# Server running on http://localhost:5000
```

**Terminal 2 - Frontend:**
```bash
cd frontend
npm run dev
# App running on http://localhost:5173
```

## Testing

```bash
# Backend
cd backend
npm test

# Frontend
cd frontend
npm test
```