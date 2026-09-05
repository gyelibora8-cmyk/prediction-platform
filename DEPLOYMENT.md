# Deployment Guide

## Prerequisites

- Node.js 16+
- PostgreSQL 12+
- Stripe Account
- Git

## Local Development

### 1. Clone Repository
```bash
git clone https://github.com/gyelibora8-cmyk/prediction-platform.git
cd prediction-platform
```

### 2. Setup Backend
```bash
cd backend
npm install
cp .env.example .env
# Edit .env with your credentials
npm run dev
```

### 3. Setup Frontend
```bash
cd frontend
npm install
cp .env.example .env
npm run dev
```

## Docker Deployment

### 1. Build and Run with Docker Compose
```bash
docker-compose up --build
```

Access:
- Frontend: http://localhost:5173
- Backend: http://localhost:5000
- Database: localhost:5432

### 2. Create Database Tables
```bash
docker-compose exec postgres psql -U postgres -d prediction_platform -f /app/database/schema.sql
```

## Production Deployment

### Heroku

#### Backend
```bash
cd backend
heroku create prediction-platform-api
heroku addons:create heroku-postgresql:hobby-dev
heroku config:set JWT_SECRET="your_secret"
heroku config:set STRIPE_SECRET_KEY="your_key"
git push heroku main
```

#### Frontend
```bash
cd frontend
heroku create prediction-platform-web
heroku config:set VITE_API_URL="https://prediction-platform-api.herokuapp.com"
git push heroku main
```

### AWS EC2

1. Launch EC2 instance
2. Install Node.js and PostgreSQL
3. Clone repository
4. Setup environment variables
5. Use PM2 for process management

```bash
npm install -g pm2
pm2 start backend/server.js --name "prediction-api"
pm2 start frontend/package.json --name "prediction-web"
pm2 save
pm2 startup
```

### Vercel (Frontend)

1. Push to GitHub
2. Import project on Vercel
3. Set environment variables
4. Deploy

### RailWay.app or Render (Backend)

1. Connect GitHub repository
2. Set environment variables
3. Deploy

## Environment Variables

See `backend/ENV_TEMPLATE.md` for complete list.

## Database Migrations

```bash
# Run schema
psql prediction_platform < database/schema.sql

# Seed data
psql prediction_platform < database/seed.sql
```

## Monitoring

- Use PM2 Plus for Node.js monitoring
- Setup CloudWatch for AWS
- Monitor database performance with PostgreSQL tools

## Security Checklist

- [ ] Change all default passwords
- [ ] Enable HTTPS/SSL
- [ ] Setup firewall rules
- [ ] Enable database backups
- [ ] Setup rate limiting
- [ ] Enable CORS properly
- [ ] Rotate JWT secrets regularly
- [ ] Use environment variables for secrets
- [ ] Enable database encryption
- [ ] Setup monitoring and alerts
