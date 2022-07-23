import { createSlice } from "@reduxjs/toolkit";
import {
  signup,
  login,
  userinfo,
  patchUserinfo,
  myinfo,
  logout,
  getGithubLoginUrl,
  getKakaoLoginUrl,
  editPassword,
  userWithdrawals,
  emailAuth,
} from "../actions/user";

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
  // OAuth로그인
  githubLoginUrl: null,
  kakaoLoginUrl: null,
  getOAuthUrlLoading: false,
  getOAuthUrlDone: false,
  getOAuthUrlError: null,
  // 로그아웃
  logoutLoading: false,
  logoutDone: false,
  logoutError: null,
  // 내 정보 조회
  loadMyInfoLoading: false,
  loadMyInfoDone: false,
  loadMyInfoError: null,
  // 유저 정보 가져오기
  userInfo: { userinfo: null, count: null },
  userInfoLoading: false,
  userInfoDone: false,
  userInfoError: null,
  // 유저 정보 수정
  patchUserLoading: false,
  patchUserDone: false,
  patchUserError: null,
  // 비밀번호 변경
  editPasswordLoading: false,
  editPasswordDone: false,
  editPasswordError: null,
  // 유저 탈퇴
  userWithdrawalsLoading: false,
  userWithdrawalsDone: false,
  userWithdrawalsError: null,
  // 이메일 인증
  emailAuthLoading: false,
  emailAuthDone: false,
  emailAuthError: null,
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
        state.loginError = action;
        console.log(state.loginError);
      })
      // github login
      .addCase(getGithubLoginUrl.pending, (state) => {
        state.getOAuthUrlLoading = true;
        state.getOAuthUrlDone = false;
        state.getOAuthUrlError = null;
      })
      .addCase(getGithubLoginUrl.fulfilled, (state, action) => {
        state.githubLoginUrl = action.payload;
        state.getOAuthUrlLoading = false;
        state.getOAuthUrlDone = true;
      })
      .addCase(getGithubLoginUrl.rejected, (state, action) => {
        console.log(action);
        state.getOAuthUrlLoading = false;
        state.getOAuthUrlError = action.error;
      })
      // kakao login
      .addCase(getKakaoLoginUrl.pending, (state) => {
        state.getOAuthUrlLoading = true;
        state.getOAuthUrlDone = false;
        state.getOAuthUrlError = null;
      })
      .addCase(getKakaoLoginUrl.fulfilled, (state, action) => {
        state.kakaoLoginUrl = action.payload;
        state.getOAuthUrlLoading = false;
        state.getOAuthUrlDone = true;
      })
      .addCase(getKakaoLoginUrl.rejected, (state, action) => {
        state.getOAuthUrlLoading = false;
        state.getOAuthUrlError = action.error.message;
      })
      // logout
      .addCase(logout.pending, (state) => {
        state.logoutLoading = true;
        state.logoutDone = false;
        state.logoutError = null;
      })
      .addCase(logout.fulfilled, (state) => {
        state.logoutLoading = false;
        state.logoutDone = true;
        state.me = null;
      })
      .addCase(logout.rejected, (state, action) => {
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
        state.patchUserLoading = true;
        state.patchUserDone = false;
        state.patchUserError = null;
      })
      .addCase(patchUserinfo.fulfilled, (state, action) => {
        state.patchUserLoading = false;
        state.patchUserDone = true;
        state.me = action.payload;
      })
      .addCase(patchUserinfo.rejected, (state, action) => {
        state.patchUserLoading = false;
        state.patchUserError = action.payload;
      })
      // editPassword
      .addCase(editPassword.pending, (state) => {
        state.editPasswordLoading = true;
        state.editPasswordDone = false;
        state.editPasswordError = null;
      })
      .addCase(editPassword.fulfilled, (state) => {
        state.editPasswordLoading = false;
        state.editPasswordDone = true;
      })
      .addCase(editPassword.rejected, (state) => {
        state.editPasswordLoading = false;
        state.editPasswordError = action.payload;
      })
      // userWithdrawals
      .addCase(userWithdrawals.pending, (state) => {
        state.userWithdrawalsLoading = true;
        state.userWithdrawalsDone = false;
        state.userWithdrawalsError = null;
      })
      .addCase(userWithdrawals.fulfilled, (state) => {
        state.userWithdrawalsLoading = false;
        state.userWithdrawalsDone = true;
        state.me = false;
      })
      .addCase(userWithdrawals.rejected, (state, action) => {
        state.userWithdrawalsLoading = false;
        state.userWithdrawalsError = action;
      })
      // emailAuth
      .addCase(emailAuth.pending, (state) => {
        state.emailAuthLoading = true;
        state.emailAuthDone = false;
        state.emailAuthError = null;
      })
      .addCase(emailAuth.fulfilled, (state) => {
        state.emailAuthLoading = false;
        state.emailAuthDone = true;
      })
      .addCase(emailAuth.rejected, (state, action) => {
        state.emailAuthLoading = false;
        state.emailAuthError = action;
      })
      .addDefaultCase((state) => state),
});

export default userSlice;
