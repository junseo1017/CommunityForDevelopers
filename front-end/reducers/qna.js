import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { getqnabyuserid } from "../actions/qna";

export const getQnaData = createAsyncThunk("qna/getQnaData", async () => {
  try {
    const response = await axios.get("/api/qnas");
    console.log("response: ", response.data);
    return response.data;
  } catch (error) {
    console.log(error);
  }
});

// qnaId: "",
// title: "Question Title",
// contents: "Question Content",
// userId: "userA",
// imgUrl: ["...png", "...png"],
// recommends: ["userD", "userB", "userC"],
// tags: ["HTML/CSS", "JavaScript", "React.js"],
// isAnswer: false,
// parentQnaId: null,
const initialState = {
  // Questions & Answers
  qnas: [],
  status: null,
  isLoading: false,
  isAuth: false,
  qnabyUserId: null,
  getQnAByUserIdLoading: false,
  getQnAByUserIdDone: false,
  getQnAByUserIdError: false,
};

const qnaSlice = createSlice({
  name: "qna",
  initialState,
  reducers: {
    // Reducers
  },
  extraReducers: (builder) => {
    builder
      .addCase(getQnaData.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(getQnaData.fulfilled, (state, action) => {
        state.status = "success";
        state.qnas = action.payload;
        console.log(action.payload);
      })
      .addCase(getQnaData.rejected, (state, action) => {
        state.status = "failed";
      })
      // getCommentByUserId
      .addCase(getqnabyuserid.pending, (state, action) => {
        state.getQnAByUserIdLoading = true;
        state.getQnAByUserIdDone = false;
        state.getQnAByUserIdError = false;
      })
      .addCase(getqnabyuserid.fulfilled, (state, action) => {
        state.getQnAByUserIdLoading = false;
        state.getQnAByUserIdDone = true;
        state.qnabyUserId = action.payload;
      })
      .addCase(getqnabyuserid.rejected, (state, action) => {
        state.getQnAByUserIdLoading = false;
        state.getQnAByUserIdError = action.error;
      });
  },
});

export const qnaActions = qnaSlice.actions;
export default qnaSlice;
