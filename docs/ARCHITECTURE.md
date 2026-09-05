# Architecture Overview

## System Design

The Prediction Platform is built as a modern Single Page Application (SPA) with a RESTful API backend.

### Frontend Architecture

- **Framework**: React 18 with Vite for fast development
- **State Management**: Redux for global state
- **Real-time Communication**: Socket.io for WebSocket connections
- **HTTP Client**: Axios with interceptors for authentication
- **UI Framework**: Tailwind CSS for styling

### Backend Architecture

- **Runtime**: Node.js with Express.js framework
- **Database**: PostgreSQL with connection pooling
- **Authentication**: JWT tokens with refresh mechanism
- **API**: RESTful endpoints with proper status codes
- **Real-time**: Socket.io server for live updates
- **Payment**: Stripe API integration

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
   - User pays via Stripe
   - Prediction stored in database
   - Real-time update via WebSocket
   - Leaderboard updated

3. **Real-time Updates**:
   - Socket.io connection established on app load
   - Server pushes updates to all connected clients
   - Leaderboard refreshes in real-time
   - Prediction results announced instantly

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

### Payments
- `POST /api/payments/create-intent` - Create Stripe payment intent
- `POST /api/payments/confirm` - Confirm payment
- `GET /api/payments/history` - Get payment history

### Events
- `GET /api/events` - List events
- `GET /api/events/:id` - Get event details
- `POST /api/events` - Create event (admin)
- `PATCH /api/events/:id/close` - Close event (admin)