import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

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
      });
  },
});

export const qnaActions = qnaSlice.actions;
export default qnaSlice;

// export const getQnaData = () => {
//   return async (dispatch) => {
//     const getData = async () => {
//       const response = await axios.get("/api/qnas");
//       const result = response.data;

//       return result;
//     };

//     try {
//       const questions = await getData();
//       console.log(questions);

//       dispatch(qnaActions.showQuestionsList(questions));
//     } catch (error) {
//       console.log(error);
//     }
//   };
// };
