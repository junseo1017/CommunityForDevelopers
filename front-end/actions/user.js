import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { backendUrl } from "../config/config";
import { popUp } from "../components/Common/popupCenter";
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
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response.data);
  }
});

export const githubLogin = createAsyncThunk(
  "user/oauthlogin",
  async (data, { rejectWithValue }) => {
    try {
      const response = await axios.get("/api/users/oauth/github");
      const popup = popUp(response.data.url, "CFD Github login", 400, 500);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  },
);

export const logout = createAsyncThunk("user/logout", async (data, { rejectWithValue }) => {
  try {
    console.log(`%c 로그아웃 요청`, "color: green;");
    const response = await axios.get("/api/users/logout");
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response.data);
  }
});

export const myinfo = createAsyncThunk("user/myinfo", async (data, { rejectWithValue }) => {
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
      const response = await axios.put(`/api/users/info`, data);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  },
);

export const userinfo = createAsyncThunk("user/userinfo", async (data, { rejectWithValue }) => {
  try {
    const response = await axios.get(`/api/users/${data}`);

    return response.data;
  } catch (error) {
    return rejectWithValue(error.response.data);
  }
});
