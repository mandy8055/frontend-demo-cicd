import { createSlice } from '@reduxjs/toolkit';
import { RootState } from 'src/app/common/types';
const todaysDate = new Date();
const initialState = {
  selectedDate: new Date(todaysDate).toLocaleDateString(),
};
export const dateSlice = createSlice({
  name: 'date',
  initialState,
  reducers: {
    updateDate: (state, action) => {
      state.selectedDate = action.payload;
    },
  },
});
export const selectDate = (state: RootState) => state.date.selectedDate;
export const { updateDate } = dateSlice.actions;
export default dateSlice.reducer;
