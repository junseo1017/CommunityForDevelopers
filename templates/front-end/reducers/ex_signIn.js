/////// 본 파일은 예시 파일입니다 /////////
// 아래 링크에서 비동기 상태 관리 어떤식으로 하는지 확인 가능
// https://github.com/ZeroCho/react-nodebird/blob/master/toolkit/front/reducers/user.js

// 아래는 동기적 상태 관리
import { createSlice } from '@reduxjs/toolkit';

const initialState = { status: ' ' };

const signInSlice = createSlice({
  name: 'SignInStatus',
  initialState,
  reducers: {
    startSignIn(state) {
      state.status = 'checking';
    },
  },
});

export const SignInActions = signInSlice.actions;
export default signInSlice;
