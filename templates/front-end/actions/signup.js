import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { backendUrl } from "../config/config";

axios.defaults.baseURL = backendUrl;
axios.defaults.withCredentials = true; // front, backend 간 쿠키공유

export const signup = createAsyncThunk("user/signup", async (data, { rejectWithValue }) => {
  try {
    console.log(data);
    const response = await axios.post("/api/register", data);
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response.data);
  }
});
