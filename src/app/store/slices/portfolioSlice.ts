import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { PortfolioState, RootState } from 'src/app/common/types';

const initialState: PortfolioState = {
  selectedPortfolio: [
    83074, 83077, 83078, 89338, 89339, 169340, 169341, 169788, 169789, 169790,
    169791, 170897, 192977, 193147, 193148, 193149, 193150, 193151, 193171,
    193172, 193173, 193174, 193175, 193255, 193256, 193257, 193258, 193259,
    193791, 193792, 193793, 193794, 193796, 194509, 194856, 194983, 195033,
    195034, 195035, 195036, 195038, 195125, 195126, 195127, 195128, 205522,
    205568, 224383, 230139, 234100, 246525, 247106, 247133, 247897, 248111,
    248781, 248782, 248783, 253945, 253946, 253947, 253948, 253949, 253956,
    253957, 253958, 253959, 253960, 253961, 253963, 253964, 253965, 253966,
    253967, 253968, 261456, 261457, 261458, 261492, 261494, 261499,
  ],
};

export const portfolioSlice = createSlice({
  name: 'portfolio',
  initialState,
  reducers: {
    updatePortfolio: (state, action: PayloadAction<PortfolioState>) => {
      state.selectedPortfolio = action.payload.selectedPortfolio;
    },
  },
});

export const selectPortfolio = (state: RootState) =>
  state.portfolio.selectedPortfolio;
export const { updatePortfolio } = portfolioSlice.actions;
export default portfolioSlice.reducer;
