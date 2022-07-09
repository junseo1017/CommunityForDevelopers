import { createSlice } from "@reduxjs/toolkit";
import { signup } from "../actions/sign";

const initialState = {
  isLoggedin: null, // 로그인 여부
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
        state.loginLoading = true;
        state.loginDone = false;
        state.loginError = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        console.log(action.payload);
        state.loginLoading = false;
        state.isLoggedin = action.payload;
        state.loginDone = true;
      })
      .addCase(login.rejected, (state, action) => {
        state.loginLoading = false;
        state.loginError = action.payload;
      })
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
