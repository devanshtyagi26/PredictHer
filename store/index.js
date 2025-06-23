import { configureStore } from '@reduxjs/toolkit';
import cycleReducer from './slices/cycleSlice';

export const store = configureStore({
  reducer: {
    cycle: cycleReducer,
  },
});
