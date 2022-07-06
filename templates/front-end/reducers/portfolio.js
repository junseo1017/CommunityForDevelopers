import { createSlice } from "@reduxjs/toolkit";
//수정중
const initialState = {
  isLoading: false,
  isAuth: false,
  isError: "",
  portfolios: [
    {
      portId: 0,
      title: "Card title",
      description: "This is the description",
      user: { userId: "", userImages: ["https://joeschmoe.io/api/v1/random"] },
      images: ["https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"],
      recommend: 0,
      skills: [],
      githubLink: "",
      siteUrl: "",
    },
  ],
};

const portfolioSlice = createSlice({
  name: "portfolio",
  initialState,
  reducers: {
    startSignIn(state) {
      state.status = "checking";
    },
  },
});

export const SignInActions = signInSlice.actions;
export default signInSlice;
