import { createSlice } from "@reduxjs/toolkit";
import { signup, login, userinfo, patchUserinfo, myinfo, logout } from "../actions/user";

const initialState = {
  // 내 정보
  me: false,
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
  // 내 정보 조회
  loadMyInfoLoading: false,
  loadMyInfoDone: false,
  loadMyInfoError: null,
  // 유저 정보 가져오기
  userInfo: null,
  userInfoLoading: false,
  userInfoDone: false,
  userInfoError: null,
  // 유저 정보 수정
  patchUserLoading: false,
  patchUserDone: false,
  patchUserError: null,
  /* By 지의신 Portfolio */
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    /* By 지의신 Portfolio */
    addPortfolioToMe(state, action) {
      state.me.Portfolios.unshift({ id: action.payload });
    },
  },
  extraReducers: (builder) =>
    builder
      // login
      .addCase(login.pending, (state) => {
        state.loginLoading = true;
        state.loginDone = false;
        state.loginError = null;
      })
      .addCase(login.fulfilled, (state) => {
        state.loginLoading = false;
        state.loginDone = true;
      })
      .addCase(login.rejected, (state, action) => {
        state.loginLoading = false;
        state.loginError = action.payload;
      })

      // logout
      .addCase(logout.pending, (state) => {
        console.log("pending");
        state.logoutLoading = true;
        state.logoutDone = false;
        state.logoutError = null;
      })
      .addCase(logout.fulfilled, (state) => {
        console.log("fulfilled");
        state.logoutLoading = false;
        state.logoutDone = true;
        state.me = null;
      })
      .addCase(logout.rejected, (state, action) => {
        console.log("rejected");
        state.loginLoading = false;
        state.logoutError = action.payload;
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
      // myinfo
      .addCase(myinfo.pending, (state) => {
        state.loadMyInfoLoading = true;
        state.loadMyInfoDone = false;
        state.loadMyInfoError = null;
      })
      .addCase(myinfo.fulfilled, (state, action) => {
        state.loadMyInfoLoading = false;
        state.me = action.payload;
        state.loadMyInfoDone = true;
      })
      .addCase(myinfo.rejected, (state, action) => {
        state.loadMyInfoLoading = false;
        state.loadMyInfoError = action.error.message;
      })
      // userinfo
      .addCase(userinfo.pending, (state) => {
        state.userInfoLoading = true;
        state.userInfoDone = false;
        state.userInfoError = null;
      })
      .addCase(userinfo.fulfilled, (state, action) => {
        state.userInfoLoading = false;
        state.userInfo = action.payload;
      })
      .addCase(userinfo.rejected, (state, action) => {
        state.userInfoLoading = false;
        state.userInfoError = action.error.message;
      })
      // patchuserinfo
      .addCase(patchUserinfo.pending, (state) => {
        console.log("pending");
        state.patchUserLoading = true;
        state.patchUserDone = false;
        state.patchUserError = null;
      })
      .addCase(patchUserinfo.fulfilled, (state, action) => {
        console.log("fulfilled");
        state.patchUserLoading = false;
        state.patchUserDone = true;
        state.me = action.payload;
      })
      .addCase(patchUserinfo.rejected, (state, action) => {
        console.log("reject", action.payload);

        state.patchUserLoading = false;
        state.patchUserError = action.payload;
      })
      .addDefaultCase((state) => state),
});

export default userSlice;
