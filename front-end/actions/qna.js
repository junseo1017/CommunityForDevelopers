import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { backendUrl } from "../config/config";

axios.defaults.baseURL = backendUrl;

export const getqnabyuserid = createAsyncThunk(
  "user/userinfo",
  async (data, { rejectWithValue }) => {
    try {
      const response = await axios.get("/api/qnas/user/list", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      console.log(response.data);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  },
);
