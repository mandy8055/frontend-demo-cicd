import { createSlice } from '@reduxjs/toolkit';
import { WelcomeState } from 'src/app/common/types';

const initialState: WelcomeState = {
  userFirstName: '',
  userLastName: '',
};

const welcomeSlice = createSlice({
  name: 'welcome',
  initialState,
  reducers: {
    updateUsername: (state, action) => {
      state.userFirstName = action.payload;
    },
  },
});

export const { updateUsername } = welcomeSlice.actions;
export default welcomeSlice.reducer;
