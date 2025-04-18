import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  data: [],
};

const BannerDataSlice = createSlice({
  name: "BannerDataSlice",

  initialState,
  reducers: {
    // resetState: (state) => {},
    handleFetchServiceBannerData: (state, action) => {
      state.data = action.payload;
    },
    handleFetchPortfolioBannerData: (state, action) => {
      state.data = action.payload;
    },
  },
});

export default BannerDataSlice.reducer;
export const {
  //   resetState,
  handleFetchPortfolioBannerData,
  handleFetchServiceBannerData,
} = BannerDataSlice.actions;
