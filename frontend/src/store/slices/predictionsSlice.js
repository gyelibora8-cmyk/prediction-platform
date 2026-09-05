import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import api from '../../services/api'

const initialState = {
  predictions: [],
  currentPrediction: null,
  loading: false,
  error: null,
}

export const fetchPredictions = createAsyncThunk(
  'predictions/fetchPredictions',
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get('/predictions')
      return response.data
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch predictions')
    }
  }
)

export const createPrediction = createAsyncThunk(
  'predictions/createPrediction',
  async (predictionData, { rejectWithValue }) => {
    try {
      const response = await api.post('/predictions', predictionData)
      return response.data
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to create prediction')
    }
  }
)

const predictionsSlice = createSlice({
  name: 'predictions',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPredictions.pending, (state) => {
        state.loading = true
      })
      .addCase(fetchPredictions.fulfilled, (state, action) => {
        state.loading = false
        state.predictions = action.payload
      })
      .addCase(fetchPredictions.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })
      .addCase(createPrediction.pending, (state) => {
        state.loading = true
      })
      .addCase(createPrediction.fulfilled, (state, action) => {
        state.loading = false
        state.predictions.push(action.payload)
      })
      .addCase(createPrediction.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })
  },
})

export const { clearError } = predictionsSlice.actions
export default predictionsSlice.reducer
