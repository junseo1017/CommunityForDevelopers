import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { backendUrl } from "../config/config";

axios.defaults.baseURL = backendUrl;
axios.defaults.withCredentials = true; // front, backend 간 쿠키공유

export const signup = createAsyncThunk("user/signup", async (data, { rejectWithValue }) => {
  try {
    const response = await axios.post("/api/users/", data);
    return response.data;
  } catch (error) {
    console.log(error.response);
    return rejectWithValue(error.response.data);
  }
});

export const login = createAsyncThunk("user/login", async (data, { rejectWithValue }) => {
  try {
    console.log(`%c 로그인 요청: ${Object.values(data)} `, "color: green;");
    const response = await axios.post("/api/users/login", data);
    console.log(response);
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response.data);
  }
});

export const myinfo = createAsyncThunk("user/userinfo", async (data, { rejectWithValue }) => {
  try {
    const response = await axios.get("/api/users/token");
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response.data);
  }
});

export const patchUserinfo = createAsyncThunk(
  "user/patchUserinfo",
  async (data, { rejectWithValue }) => {
    try {
      console.log(`%c 유저 정보 수정 요청: ${Object.values(data)} `, "color: green;");
      const response = await axios.patch(`/api/users/info`, data, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  },
);
