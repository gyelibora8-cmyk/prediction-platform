import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import api from '../../services/api'

const initialState = {
  paymentHistory: [],
  currentPayment: null,
  loading: false,
  error: null,
}

export const createPaymentIntent = createAsyncThunk(
  'payments/createPaymentIntent',
  async ({ amount, predictionId }, { rejectWithValue }) => {
    try {
      const response = await api.post('/payments/create-intent', { amount, predictionId })
      return response.data
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to create payment')
    }
  }
)

export const confirmPayment = createAsyncThunk(
  'payments/confirmPayment',
  async (paymentMethodId, { rejectWithValue }) => {
    try {
      const response = await api.post('/payments/confirm', { paymentMethodId })
      return response.data
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Payment confirmation failed')
    }
  }
)

const paymentsSlice = createSlice({
  name: 'payments',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createPaymentIntent.pending, (state) => {
        state.loading = true
      })
      .addCase(createPaymentIntent.fulfilled, (state, action) => {
        state.loading = false
        state.currentPayment = action.payload
      })
      .addCase(createPaymentIntent.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })
      .addCase(confirmPayment.pending, (state) => {
        state.loading = true
      })
      .addCase(confirmPayment.fulfilled, (state, action) => {
        state.loading = false
        state.currentPayment = action.payload
      })
      .addCase(confirmPayment.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })
  },
})

export const { clearError } = paymentsSlice.actions
export default paymentsSlice.reducer
