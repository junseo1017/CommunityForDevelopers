import { createSlice } from "@reduxjs/toolkit";
import { signup } from "../actions/signup";

const initialState = {
  signupLoading: false,
  signupDone: false,
  signupError: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) =>
    builder
      // signup
      .addCase(signup.pending, (state) => {
        state.signupLoading = true;
        state.signupDone = false;
        state.signupError = null;
      })
      .addCase(signup.fulfilled, (state) => {
        state.signupLoading = false;
        state.signupDone = true;
      })
      .addCase(signup.rejected, (state, action) => {
        state.signupLoading = false;
        state.signupError = action.payload;
      })
      .addDefaultCase((state) => state),
});

export default userSlice;
