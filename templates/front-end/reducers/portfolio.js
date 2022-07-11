import { createSlice, current } from "@reduxjs/toolkit";
//수정중
const initialState = {
  title: "",
  skills: [],
  description: "",
  image: {},
  content: "",
};

const portfolioSlice = createSlice({
  name: "portfolio",
  initialState,
  reducers: {
    updateState(state, action) {
      return { ...state, ...action.payload };
    },
  },
});

export const portfolioActions = portfolioSlice.actions;
export default portfolioSlice;
