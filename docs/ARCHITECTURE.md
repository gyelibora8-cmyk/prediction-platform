# Architecture Overview

## System Design

The Prediction Platform is built as a modern Single Page Application (SPA) with a RESTful API backend.

### Frontend Architecture

- **Framework**: React 18 with Vite for fast development
- **State Management**: Redux for global state
- **Real-time Communication**: Socket.io for WebSocket connections
- **HTTP Client**: Axios with interceptors for authentication
- **UI Framework**: Tailwind CSS for styling
- **Payment Integration**: Paystack embedded forms and redirects

### Backend Architecture

- **Runtime**: Node.js with Express.js framework
- **Database**: PostgreSQL with connection pooling
- **Authentication**: JWT tokens with refresh mechanism
- **API**: RESTful endpoints with proper status codes
- **Real-time**: Socket.io server for live updates
- **Payment**: Paystack API integration for secure payment processing

### Data Flow

1. **User Authentication Flow**:
   - User registers/logs in
   - Backend validates credentials
   - JWT token issued
   - Token stored in localStorage (frontend)
   - Subsequent requests include token in Authorization header

2. **Prediction Flow**:
   - User views available events
   - User makes prediction (Up/Down)
   - User initiates payment via Paystack
   - Paystack processes payment securely
   - Backend verifies payment
   - Prediction stored in database
   - Real-time update via WebSocket
   - Leaderboard updated

3. **Real-time Updates**:
   - Socket.io connection established on app load
   - Server pushes updates to all connected clients
   - Leaderboard refreshes in real-time
   - Prediction results announced instantly

4. **Payment Processing with Paystack**:
   - User clicks "Make Payment"
   - Frontend initializes Paystack payment
   - Backend creates payment intent via Paystack API
   - User completes payment on Paystack checkout
   - Paystack webhook notifies backend of payment status
   - Backend verifies payment reference
   - Prediction confirmed and stored

## API Endpoints

### Authentication
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `POST /api/auth/refresh` - Refresh JWT token
- `POST /api/auth/logout` - User logout

### Users
- `GET /api/users/profile` - Get user profile
- `PUT /api/users/profile` - Update profile
- `GET /api/users/stats` - Get user statistics

### Predictions
- `GET /api/predictions` - List all predictions
- `GET /api/predictions/:id` - Get prediction details
- `POST /api/predictions` - Create prediction
- `GET /api/predictions/my-predictions` - Get user's predictions

### Leaderboards
- `GET /api/leaderboard` - Get global leaderboard
- `GET /api/leaderboard/monthly` - Get monthly rankings
- `GET /api/leaderboard/user/:userId` - Get user rank

### Payments (Paystack)
- `POST /api/payments/initialize` - Initialize Paystack payment
- `POST /api/payments/verify` - Verify payment reference
- `GET /api/payments/history` - Get payment history
- `POST /api/payments/webhook` - Paystack webhook (for server-side verification)

### Events
- `GET /api/events` - List events
- `GET /api/events/:id` - Get event details
- `POST /api/events` - Create event (admin)
- `PATCH /api/events/:id/close` - Close event (admin)

## Technology Stack

### Frontend Dependencies
```
react@18
vite
tailwindcss
axios
socket.io-client
redux
@paystack/inline-js
```

### Backend Dependencies
```
express
postgresql
jsonwebtoken
dotenv
socket.io
paystack
cors
```

## Security Considerations

### Authentication & Authorization
- JWT tokens with 7-day expiration
- Refresh token mechanism for extended sessions
- Role-based access control (user/admin)
- Secure password hashing with bcrypt

### Payment Security
- All payments processed through Paystack
- No direct credit card handling on backend
- Webhook signature verification
- Payment reference verification
- HTTPS/TLS encryption for all transmissions
- Environment variables for sensitive keys

### API Security
- CORS configured for frontend domain only
- Rate limiting on payment endpoints
- Input validation on all endpoints
- SQL injection protection via parameterized queries
- XSS protection via Content Security Policy headers

## Database Schema

### Key Tables
- **users** - User accounts with roles
- **events** - Prediction events
- **predictions** - User predictions with outcomes
- **payments** - Payment records with Paystack references
- **leaderboard_scores** - Cached leaderboard data

### Indexes
- Email indexing for fast user lookup
- Status indexing for filtering events and predictions
- User ID indexing for relationship queries

## Deployment Architecture

### Frontend (Vercel)
- Automatic deployments from GitHub
- Global CDN for static assets
- Environment-based configuration
- Automatic HTTPS

### Backend (Railway)
- Docker containerization
- PostgreSQL database managed by Railway
- Environment variables in Railway dashboard
- Automatic deployments from GitHub
- Zero-downtime deployments

### Real-time Communication
- Socket.io connections with sticky sessions
- Automatic reconnection handling
- Event namespacing for different data types

## Performance Optimization

- Frontend code splitting with React.lazy
- Image optimization and lazy loading
- Database query optimization with indexes
- Connection pooling for database
- Caching of leaderboard data
- Gzip compression for API responses
