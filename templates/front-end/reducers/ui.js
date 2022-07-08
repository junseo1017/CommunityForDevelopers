import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  isDrawerVisible: true,
};

const UISlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    visibleDrawer(state) {
      state.isDrawerVisible = true;
    },
  },
});

export const UIActions = UISlice.actions;
export default UISlice;
