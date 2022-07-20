import { createSlice } from "@reduxjs/toolkit";
import _concat from "lodash/concat";
import _remove from "lodash/remove";
import _find from "lodash/find";
import { uploadImages } from "../actions/image";

const initialState = {
  // 다음 portfolios 여부
  imagePaths: [],
  imagePath: {},
  uploadImagesLoading: false,
  uploadImagesDone: false,
  uploadImagesError: null,
  // 준서
};

const imageSlice = createSlice({
  name: "image",
  initialState,
  reducers: {},
  extraReducers: (builder) =>
    builder
      // uploadImages
      .addCase(uploadImages.pending, (state) => {
        state.uploadImagesLoading = true;
        state.uploadImagesDone = false;
        state.uploadImagesError = null;
      })
      .addCase(uploadImages.fulfilled, (state, action) => {
        state.uploadImagesLoading = false;
        state.uploadImagesDone = true;
        state.imagePaths = _concat(state.imagePaths, action.payload);
        state.imagePath = action.payload;
      })
      .addCase(uploadImages.rejected, (state, action) => {
        state.uploadImagesLoading = false;
        state.uploadImagesError = action.error.message;
      }),
});

export default imageSlice;
