///api/images

import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { backendUrl } from "../config/config";
// import userSlice from "../reducers/user";

axios.defaults.baseURL = backendUrl;
axios.defaults.withCredentials = true; // front, backend 간 쿠키공유

export const uploadImages = createAsyncThunk(
  "image/uploadImages",
  async (data, { rejectWithValue }) => {
    try {
      const response = await axios.post("/api/images", data); // POST /portfolio/images
      console.log(response.data);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  },
);

export const removeImages = createAsyncThunk(
  "image/removeImages",
  async (data, { rejectWithValue }) => {
    try {
      //{imgUrl:data}
      const response = await axios.delete("/api/images", data); // POST /portfolio/images
      console.log(response.data);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  },
);
