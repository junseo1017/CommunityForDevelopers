import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { backendUrl } from "../config/config";

axios.defaults.baseURL = backendUrl;
// axios.defaults.withCredentials = true; // front, backend 간 쿠키공유

export const signup = createAsyncThunk("user/signup", async (data, { rejectWithValue }) => {
  try {
    const response = await axios.post("/api/register", data);
    console.log("res data", response.data);
    return response.data;
  } catch (error) {
    console.log(error.response);
    return rejectWithValue(error.response.data);
  }
});

export const login = createAsyncThunk("user/login", async (data, { rejectWithValue }) => {
  try {
    console.log(`%c 로그인 요청: ${Object.values(data)} `, "color: green;");
    const response = await axios.post("/api/login", data);
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response.data);
  }
});

export const userinfo = createAsyncThunk("user/nickname", async (data, { rejectWithValue }) => {
  try {
    // console.log(`%c 회원정보 요청: ${data} `, "color: green;");
    const response = await axios.get("/api/users/token", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    console.log(response.data);
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response.data);
  }
});
