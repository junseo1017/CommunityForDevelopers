import { createSlice } from "@reduxjs/toolkit";
import { signup, login, userinfo, patchUserinfo } from "../actions/user";

const initialState = {
  // 로그인 여부
  isLoggedin: false,
  // 새로고침 발생할 경우 로그인 여부 체크
  isLoggedinCheck: false,
  // 유저 정보
  userInfo: { _id: null, email: null },
  // 회원가입
  signupLoading: false,
  signupDone: false,
  signupError: null,
  // 로그인
  loginLoading: false,
  loginDone: false,
  loginError: null,
  // 로그아웃
  logoutLoading: false,
  logoutDone: false,
  logoutError: null,
  // 유저 정보 조회
  loadUserLoading: false,
  loadUserDone: false,
  loadUserError: null,
  /* By 지의신 Portfolio */
  me: null,
  // 유저 정보 수정
  patchUserLoading: false,
  patchUserDone: false,
  patchUserError: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    logout(state) {
      state.isLoggedin = false;
      state.userInfo = { _id: null, email: null };
    },
    addLoginStatus(state, action) {
      state.isLoggedin = action.payload;
    },
    checkLoggedin(state) {
      state.isLoggedinCheck = true;
    },
    /* By 지의신 Portfolio */
    addPortfolioToMe(state, action) {
      state.me.Portfolios.unshift({ id: action.payload });
    },
  },
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
      .addCase(userinfo.pending, (state) => {
        console.log("pending");
        state.loadUserLoading = true;
        state.loadUserDone = false;
        state.loadUserError = null;
      })
      .addCase(userinfo.fulfilled, (state, action) => {
        console.log("fulfilled");
        state.loadUserLoading = false;
        state.userInfo = action.payload;
        state.loadUserDone = true;
      })
      .addCase(userinfo.rejected, (state, action) => {
        state.loadUserLoading = false;
        state.loadUserError = action.payload;
      })
      .addCase(patchUserinfo.pending, (state) => {
        state.patchUserLoading = true;
        state.patchUserDone = false;
        state.patchUserError = null;
      })
      .addCase(patchUserinfo.fulfilled, (state, action) => {
        state.patchUserLoading = false;
        state.patchUserDone = true;
        state.userInfo = action.payload;
      })
      .addCase(patchUserinfo.rejected, (state, action) => {
        state.patchUserLoading = false;
        state.patchUserError = action.payload;
      })
      .addDefaultCase((state) => state),
});

export default userSlice;
