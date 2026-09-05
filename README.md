# Prediction Platform

A full-stack prediction gaming platform with user authentication, payment processing, real-time updates, and leaderboards.

## Features

✅ **User Authentication** - JWT-based login/registration
✅ **Payment Processing** - Paystack integration for predictions
✅ **Real-time Updates** - WebSocket support for live predictions
✅ **Leaderboards** - Ranking system based on accuracy
✅ **Prediction Management** - Create, submit, and track predictions
✅ **User Profiles** - Personal stats and history
✅ **Admin Dashboard** - Manage events and predictions

## Tech Stack

### Frontend
- React 18 + Vite
- Tailwind CSS
- Socket.io for real-time updates
- Axios for API calls
- Redux for state management

### Backend
- Node.js + Express
- PostgreSQL database
- JWT authentication
- Paystack API integration
- Socket.io for WebSocket

## Project Structure

```
├── frontend/           # React application
├── backend/            # Node.js/Express server
├── database/           # Database schemas and migrations
└── docs/               # Documentation
```

## Getting Started

### Quick Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/gyelibora8-cmyk/prediction-platform.git
   cd prediction-platform
   ```

2. **Backend Setup**
   ```bash
   cd backend
   npm install
   cp .env.example .env
   # Edit .env with your credentials
   npm run dev
   ```

3. **Frontend Setup** (in new terminal)
   ```bash
   cd frontend
   npm install
   cp .env.example .env
   npm run dev
   ```

Visit `http://localhost:5173` to access the application.

## Deployment

### Deploy on Vercel (Frontend) + Railway (Backend)

See [DEPLOYMENT.md](./DEPLOYMENT.md) for detailed instructions.

**Quick Summary:**
- Frontend: Deploy on [Vercel](https://vercel.com)
- Backend: Deploy on [Railway](https://railway.app)
- Database: PostgreSQL on Railway
- Payments: Configured with Paystack

## Documentation

- [Setup Instructions](./docs/SETUP.md)
- [Architecture Overview](./docs/ARCHITECTURE.md)
- [Deployment Guide](./DEPLOYMENT.md)
- [Contributing Guidelines](./CONTRIBUTING.md)

## Environment Variables

### Backend
```
PORT=5000
NODE_ENV=development
DB_HOST=localhost
DB_PORT=5432
DB_NAME=prediction_platform
DB_USER=postgres
DB_PASSWORD=your_password
JWT_SECRET=your_jwt_secret_key
PAYSTACK_SECRET_KEY=sk_test_...
PAYSTACK_PUBLIC_KEY=pk_test_...
```

### Frontend
```
VITE_API_URL=http://localhost:5000
VITE_PAYSTACK_KEY=pk_test_...
```

## API Endpoints

See [ARCHITECTURE.md](./docs/ARCHITECTURE.md) for complete API documentation.

## Testing

```bash
# Backend
cd backend
npm test

# Frontend
cd frontend
npm test
```

## Contributing

Please read [CONTRIBUTING.md](./CONTRIBUTING.md) for details on our code of conduct and the process for submitting pull requests.

## License

This project is licensed under the MIT License - see the [LICENSE](./LICENSE) file for details.

## Support

For issues and questions, please open an issue on GitHub or contact the maintainers.
