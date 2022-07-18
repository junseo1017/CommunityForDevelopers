import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { backendUrl } from "../config/config";
import userSlice from "../reducers/user";

axios.defaults.baseURL = backendUrl;
axios.defaults.withCredentials = true; // front, backend 간 쿠키공유

export const loadPortfolios = createAsyncThunk(
  "portfolio/loadPortfolios",
  async (data) => {
    //const response = await axios.get(`/portfolios?lastId=${data?.lastId || 0}`);
    const response = await axios.get(`/api/portfolios`);
    return response.data;
  },
  {
    condition: (data, { getState }) => {
      const { portfolio } = getState();
      if (portfolio.loadPortfoliosLoading) {
        // console.warn('중복 요청 취소');
        return false;
      }
      return true;
    },
  },
);
export const loadPortfoliosSearch = createAsyncThunk(
  "portfolio/loadPortfoliosSearch",
  async (data) => {
    const query = "?";

    const response = await axios.get("/api/portfolios/search/list", data);
    console.log(response);
    return response.data;
  },
  {
    condition: (data, { getState }) => {
      const { portfolio } = getState();
      if (portfolio.loadPortfoliosLoading) {
        // console.warn('중복 요청 취소');
        return false;
      }
      return true;
    },
  },
);

export const addPortfolio = createAsyncThunk("portfolio/addPortfolio", async (data, thunkAPI) => {
  try {
    console.log(data);
    const response = await axios.post("/api/portfolios", data);
    console.log(response);
    thunkAPI.dispatch(userSlice.actions.addPortfolioToMe(response.data.id));
    console.log(response.data);
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data);
  }
});

export const uploadImages = createAsyncThunk(
  "portfolio/uploadImages",
  async (data, { rejectWithValue }) => {
    try {
      console.log(data);
      //const response = await axios.post("/portfolio/images", data); // POST /portfolio/images
      //return response.data;
      //return data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  },
);

export const addComment = createAsyncThunk(
  "portfolio/addComment",
  async (data, { rejectWithValue }) => {
    try {
      const response = await axios.post(`/api/comments/portfolio/${data.portfolioId}`, data); // POST /portfolio/1
      return response.data;
    } catch (error) {
      console.log(error);
      return rejectWithValue(error.response.data);
    }
  },
);

export const removePortfolio = createAsyncThunk(
  "portfolio/removePortfolio",
  async (data, thunkAPI) => {
    try {
      const response = await axios.delete(`/portfolio/${data.portfolioId}`); // DELETE /portfolio/1/comment
      thunkAPI.dispatch(userSlice.actions.removePortfolioToMe(response.data.id));
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  },
);

export const loadPortfolio = createAsyncThunk(
  "portfolio/loadPortfolio",
  async (data, { rejectWithValue }) => {
    try {
      const response = await axios.get(`/api/portfolios/${data.portfolioId}`);
      return response.data;
    } catch (error) {
      return rejectWithValue("wow", error.response.data);
    }
  },
);

export const likePortfolio = createAsyncThunk(
  "user/likePortfolio",
  async (data, { rejectWithValue }) => {
    try {
      console.log(`%c 포트폴리오 추천 요청: ${Object.values(data)} `, "color: green;");
      const response = await axios.put(
        `/api/portfolios/${data.portfolioId}/?field=recommends&adding=true`,
        data,
      );
      return { ...response.data, UserId: data.UserId };
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  },
);

export const unlikePortfolio = createAsyncThunk(
  "user/unlikePortfolio",
  async (data, { rejectWithValue }) => {
    try {
      console.log(`%c 포트폴리오 추천취소 요청: ${Object.values(data)} `, "color: green;");
      const response = await axios.put(
        `/api/portfolios/${data.portfolioId}/?field=recommends&adding=false`,
        data,
      );
      return { ...response.data, UserId: data.UserId };
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  },
);

export const scrapPortfolio = createAsyncThunk(
  "user/scrapPortfolio",
  async (data, { rejectWithValue }) => {
    try {
      console.log(`%c 포트폴리오 스크랩 요청: ${Object.values(data)} `, "color: green;");
      const response = await axios.put(
        `/api/portfolios/${data.portfolioId}/?field=scraps&adding=true`,
        data,
      );
      return { ...response.data, UserId: data.UserId };
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  },
);

export const unscrapPortfolio = createAsyncThunk(
  "user/unscrapPortfolio",
  async (data, { rejectWithValue }) => {
    try {
      console.log(`%c 포트폴리오 스크랩 요청: ${Object.values(data)} `, "color: green;");
      const response = await axios.put(
        `/api/portfolios/${data.portfolioId}/?field=scraps&adding=false`,
        data,
      );
      return { ...response.data, UserId: data.UserId };
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  },
);

export const retweet = createAsyncThunk("portfolio/retweet", async (data, { rejectWithValue }) => {
  try {
    const response = await axios.post(`/portfolio/${data.portfolioId}/retweet`, data);
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response.data);
  }
});

export const updatePortfolio = createAsyncThunk(
  "portfolio/updatePortfolio",
  async (data, { rejectWithValue }) => {
    try {
      const response = await axios.patch(`/portfolio/${data.portfolioId}`, data);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  },
);

export const loadHashtagPortfolios = createAsyncThunk(
  "portfolio/loadHashtagPortfolios",
  async (data, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `/hashtag/${encodeURIComponent(data.hashtag)}?last=${data?.lastId || 0}`,
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  },
);

export const loadMyPortfolios = createAsyncThunk(
  "user/loadUserPortfolios",
  async (data, { rejectWithValue }) => {
    try {
      const response = await axios.get(`api/portfolios/user/${data}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  },
);

export const loadScrapPortfolios = createAsyncThunk(
  "user/loadScrapPortfolios",
  async (data, { rejectWithValue }) => {
    try {
      const response = await axios.get(`api/portfolios/user/${data}/scraps`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  },
);
