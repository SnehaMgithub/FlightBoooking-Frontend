import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  selectedFlight: null,
  passengerDetails: [],
  bookingHistory: [], // Add booking history
  bookingId: null,
  amount: 0,
};

const flightSlice = createSlice({
  name: 'flight',
  initialState,
  reducers: {

    setSelectedFlight: (state, action) => {
      state.selectedFlight = action.payload;
    },
    setPassengerDetails: (state, action) => {
      state.passengerDetails = action.payload;
    },

    setBookingDetails: (state, action) => {
      state.bookingId = action.payload.bookingId;
      state.amount = action.payload.amount;
    },
    setBookingHistory: (state, action) => {
      state.bookingHistory = action.payload; 
    },

  },
    clearState: () => initialState,
  });

export const {
  setSelectedFlight,
  setPassengerDetails,
  setBookingDetails,
  setBookingHistory,
  clearState,
} = flightSlice.actions;

export default flightSlice.reducer;
