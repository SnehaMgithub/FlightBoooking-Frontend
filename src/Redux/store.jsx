import { configureStore } from '@reduxjs/toolkit';
import flightReducer from './Slices/FlightSlice.jsx';

const store = configureStore({
  reducer: {
    flight: flightReducer,
  },
});

export default store;
