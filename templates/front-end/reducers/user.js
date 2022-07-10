import { createSlice } from "@reduxjs/toolkit";
import { signup, login } from "../actions/sign";

const initialState = {
  isLoggedin: false, // 로그인 여부
  // 회원가입 진행 상태 관련
  signupLoading: false,
  signupDone: false,
  signupError: null,
  // 로그인 진행 상태 관련
  loginLoading: false,
  loginDone: false,
  loginError: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) =>
    builder
      // login
      .addCase(login.pending, (state) => {
        console.log("pending");
        state.loginLoading = true;
        state.loginDone = false;
        state.loginError = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        console.log("fullfilled", action.payload);
        state.loginLoading = false;
        state.isLoggedin = action.payload;
        state.loginDone = true;
      })
      .addCase(login.rejected, (state, action) => {
        console.log("rejected");
        state.loginLoading = false;
        state.loginError = action.payload;
      })
      // signup
      .addCase(signup.pending, (state) => {
        console.log("pending");

        state.signupLoading = true;
        state.signupDone = false;
        state.signupError = null;
      })
      .addCase(signup.fulfilled, (state) => {
        console.log("fulfilled");
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
