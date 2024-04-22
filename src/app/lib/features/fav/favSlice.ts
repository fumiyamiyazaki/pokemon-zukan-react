import { PayloadAction, createSlice } from "@reduxjs/toolkit";

const initialState = {
  count: 0,
};

export const favSlice = createSlice({
  name: "fav",
  initialState,
  reducers: {
    addFav: (state) => {
      state.count = state.count + 1;
    },
    addNumFav: (state, action: PayloadAction<number>) => {
      if (action.payload && typeof action.payload === "number") {
        state.count = state.count + action.payload;
      }
    },
  },
});

export const { addFav, addNumFav } = favSlice.actions;
export default favSlice.reducer;
