import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { backendUrl } from "../config/config";
import userSlice from "../reducers/user";

axios.defaults.baseURL = backendUrl;
axios.defaults.withCredentials = true; // front, backend 간 쿠키공유

export const loadPortfolios = createAsyncThunk(
  "portfolio/loadPortfolios",
  async (data) => {
    console.log(`%c 포트폴리오 요청: ${data?.lastId} `, "color: green;");
    const response = await axios.get(`/api/portfolios/?lastId=${data?.lastId || ""}`);
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
    const response = await axios.get(`/api/search/portfolios/${data.query}`);
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

export const loadPortfoliosSearchScroll = createAsyncThunk(
  "portfolio/loadPortfoliosSearchScroll",
  async (data) => {
    const response = await axios.get(`/api/search/portfolios/${data.query}`);
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
    const response = await axios.post("/api/portfolios", data);
    //thunkAPI.dispatch(userSlice.actions.addPortfolioToMe(response.data.id));
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data);
  }
});

export const addComment = createAsyncThunk(
  "portfolio/addComment",
  async (data, { rejectWithValue }) => {
    try {
      const response = await axios.post(`/api/comments/portfolio/${data.portfolioId}`, {
        content: data.content,
      }); //
      return {
        ...response.data,
        author: {
          _id: response.data.author,
          imgUrl: data.author.imgUrl,
          nickname: data.author.nickname,
        },
      };
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  },
);

export const removePortfolio = createAsyncThunk(
  "portfolio/removePortfolio",
  async (data, thunkAPI) => {
    try {
      const response = await axios.delete(`/api/portfolios/${data.portfolioId}`); // DELETE /portfolio/1/comment
      //thunkAPI.dispatch(userSlice.actions.removePortfolioToMe(response.data.id));
      return { ...response.data, portfolioId: data.portfolioId };
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  },
);

export const removeComment = createAsyncThunk("portfolio/removeComment", async (data, thunkAPI) => {
  try {
    console.log(
      `%c 댓글 삭제 요청: /api/comments/${data.commentId}?portId=${data.portfolioId}`,
      "color: green;",
    );
    const response = await axios.delete(
      `/api/comments/${data.commentId}?portId=${data.portfolioId}`,
    ); //
    //return response.data;
    return { commentId: data.commentId };
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data);
  }
});

export const loadPortfolio = createAsyncThunk(
  "portfolio/loadPortfolio",
  async (data, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `/api/portfolios/${data.portfolioId}?portId=${data.portofolioId}`,
      );
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
        `/api/portfolios/${data.portfolioId}?field=recommends&adding=true`,
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
        `/api/portfolios/${data.portfolioId}?field=recommends&adding=false`,
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
        `/api/portfolios/${data.portfolioId}?field=scraps&adding=true`,
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
        `/api/portfolios/${data.portfolioId}?field=scraps&adding=false`,
      );
      return { ...response.data, UserId: data.UserId };
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  },
);

export const updatePortfolio = createAsyncThunk(
  "portfolio/updatePortfolio",
  async (data, { rejectWithValue }) => {
    try {
      const response = await axios.put(`/api/portfolios/${data.portfolioId}`, data.formdata);
      return { ...response.data, PortfolioId: data.portfolioId };
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
