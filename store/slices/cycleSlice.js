import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  selectedDay: null, // day user selects
  permanentDay: 14, // ovulation day or any permanent highlight
};

const cycleSlice = createSlice({
  name: 'cycle',
  initialState,
  reducers: {
    setSelectedDay: (state, action) => {
      state.selectedDay = action.payload;
    },
    setPermanentDay: (state, action) => {
      state.permanentDay = action.payload;
    },
  },
});

export const { setSelectedDay, setPermanentDay } = cycleSlice.actions;
export default cycleSlice.reducer;
