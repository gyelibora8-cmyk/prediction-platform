# Deployment Guide

## Prerequisites

- Node.js 16+
- PostgreSQL 12+
- Paystack Account
- Git
- Vercel Account (vercel.com)
- Railway Account (railway.app) or similar for backend

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

## Vercel Deployment (Recommended)

### Frontend Deployment on Vercel

#### 1. Prepare Frontend for Vercel
```bash
cd frontend
npm run build
```

#### 2. Deploy to Vercel
**Option A: Using Vercel CLI**
```bash
npm install -g vercel
vercel login
vercel --prod
```

**Option B: Using GitHub Integration**
1. Go to [vercel.com](https://vercel.com)
2. Click "Add New..." → "Project"
3. Select your GitHub repository
4. Import the project
5. Set root directory to `frontend/`

#### 3. Configure Environment Variables on Vercel
In Vercel Dashboard:
1. Go to Settings → Environment Variables
2. Add:
   ```
   VITE_API_URL=https://your-backend-url.railway.app
   VITE_PAYSTACK_KEY=pk_live_your_public_key
   ```
3. Redeploy

#### 4. Configure Build Settings
- **Framework Preset**: Vite
- **Build Command**: `npm run build`
- **Output Directory**: `dist`
- **Root Directory**: `frontend`

### Backend Deployment on Railway.app

#### 1. Push Code to GitHub
```bash
git add .
git commit -m "Ready for deployment"
git push origin main
```

#### 2. Deploy Backend on Railway
1. Go to [railway.app](https://railway.app)
2. Click "New Project" → "Deploy from GitHub repo"
3. Select `gyelibora8-cmyk/prediction-platform`
4. Select root directory: `backend`

#### 3. Add PostgreSQL Database
1. In Railway project, click "Add"
2. Select "Database" → "PostgreSQL"
3. Railway auto-generates `DATABASE_URL`

#### 4. Configure Backend Environment Variables
In Railway project settings, add:
```
NODE_ENV=production
PORT=5000
DB_HOST=${PGHOST}
DB_PORT=${PGPORT}
DB_NAME=${PGDATABASE}
DB_USER=${PGUSER}
DB_PASSWORD=${PGPASSWORD}
JWT_SECRET=your_strong_jwt_secret_key_here
REFRESH_TOKEN_SECRET=your_strong_refresh_token_key_here
PAYSTACK_SECRET_KEY=sk_live_your_secret_key
PAYSTACK_PUBLIC_KEY=pk_live_your_public_key
FRONTEND_URL=https://your-frontend.vercel.app
```

#### 5. Run Database Migrations
After Railway deploys the backend:
```bash
# SSH into Railway container or use Railway CLI
railway run psql < database/schema.sql
railway run psql < database/seed.sql
```

#### 6. Get Backend URL
The Railway project generates a public URL automatically:
```
https://prediction-platform-production.up.railway.app
```

Copy this URL and add to Vercel environment variables as `VITE_API_URL`

## Docker Deployment (Alternative)

### Build Docker Images
```bash
docker-compose build
docker-compose up
```

### Deploy to Container Platforms
- **Render**: Push to GitHub, connect repo, deploy
- **Fly.io**: Use `flyctl` CLI
- **Digital Ocean**: Use App Platform

## Environment Variables Checklist

### Backend Variables
- [ ] `NODE_ENV=production`
- [ ] `PORT=5000`
- [ ] `DB_HOST`, `DB_PORT`, `DB_NAME`, `DB_USER`, `DB_PASSWORD`
- [ ] `JWT_SECRET` (strong random string)
- [ ] `REFRESH_TOKEN_SECRET` (strong random string)
- [ ] `PAYSTACK_SECRET_KEY` (from Paystack dashboard)
- [ ] `PAYSTACK_PUBLIC_KEY` (from Paystack dashboard)
- [ ] `FRONTEND_URL` (your Vercel domain)

### Frontend Variables
- [ ] `VITE_API_URL` (your Railway backend URL)
- [ ] `VITE_PAYSTACK_KEY` (Paystack public key)

## Database Setup

### Initial Schema
```bash
# On Railway
railway run psql -d $PGDATABASE < database/schema.sql
```

### Seed Data
```bash
railway run psql -d $PGDATABASE < database/seed.sql
```

## Domain Configuration

### Connect Custom Domain to Vercel
1. Go to Vercel Dashboard → Project Settings → Domains
2. Add your domain
3. Update DNS records as per Vercel instructions

### Connect Custom Domain to Railway
1. Go to Railway → Project Settings → Domain
2. Add custom domain
3. Update DNS records

## Monitoring & Logs

### Vercel Logs
```bash
vercel logs <deployment-url>
```

### Railway Logs
In Railway Dashboard → Logs tab for real-time logs

### Database Monitoring
- Use Railway's built-in database monitoring
- Set up backups in Railway settings

## Security Checklist

- [ ] Change all default passwords
- [ ] Enable HTTPS/SSL (Vercel & Railway do this automatically)
- [ ] Setup firewall rules on database
- [ ] Enable database backups
- [ ] Setup rate limiting on backend
- [ ] Enable CORS properly (allow only frontend domain)
- [ ] Rotate JWT secrets regularly
- [ ] Use environment variables for all secrets
- [ ] Enable database encryption
- [ ] Setup monitoring and alerts on Railway

## Troubleshooting

### Frontend shows "Cannot connect to API"
- Check `VITE_API_URL` is correct in Vercel environment
- Verify backend is running on Railway
- Check CORS settings in backend

### Payment fails
- Verify Paystack keys are correct (test vs live)
- Check `PAYSTACK_SECRET_KEY` in Railway backend
- Test with Paystack test cards

### Database connection errors
- Verify `DATABASE_URL` in Railway
- Check database is running
- Run migrations again: `railway run psql < database/schema.sql`

## Deployment Completed!

Your application is now live:
- **Frontend**: https://your-frontend.vercel.app
- **Backend API**: https://your-backend.railway.app
- **Database**: Managed by Railway PostgreSQL
