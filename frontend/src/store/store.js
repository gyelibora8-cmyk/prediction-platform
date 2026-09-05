import { configureStore } from '@reduxjs/toolkit'
import authReducer from './slices/authSlice'
import predictionsReducer from './slices/predictionsSlice'
import leaderboardReducer from './slices/leaderboardSlice'
import paymentsReducer from './slices/paymentsSlice'

const store = configureStore({
  reducer: {
    auth: authReducer,
    predictions: predictionsReducer,
    leaderboard: leaderboardReducer,
    payments: paymentsReducer,
  },
})

export default store
