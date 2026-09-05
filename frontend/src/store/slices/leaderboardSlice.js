import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import api from '../../services/api'

const initialState = {
  leaderboard: [],
  userRank: null,
  loading: false,
  error: null,
}

export const fetchLeaderboard = createAsyncThunk(
  'leaderboard/fetchLeaderboard',
  async (timeframe = 'all', { rejectWithValue }) => {
    try {
      const response = await api.get(`/leaderboard?timeframe=${timeframe}`)
      return response.data
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch leaderboard')
    }
  }
)

export const fetchUserRank = createAsyncThunk(
  'leaderboard/fetchUserRank',
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get('/leaderboard/user-rank')
      return response.data
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch user rank')
    }
  }
)

const leaderboardSlice = createSlice({
  name: 'leaderboard',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchLeaderboard.pending, (state) => {
        state.loading = true
      })
      .addCase(fetchLeaderboard.fulfilled, (state, action) => {
        state.loading = false
        state.leaderboard = action.payload
      })
      .addCase(fetchLeaderboard.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })
      .addCase(fetchUserRank.fulfilled, (state, action) => {
        state.userRank = action.payload
      })
  },
})

export default leaderboardSlice.reducer
