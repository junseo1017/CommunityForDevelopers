import { createSlice } from "@reduxjs/toolkit";
import _concat from "lodash/concat";
import _remove from "lodash/remove";
import _find from "lodash/find";
import {
  addComment,
  scrapPortfolio,
  addPortfolio,
  likePortfolio,
  loadHashtagPortfolios,
  loadPortfolio,
  loadPortfolios,
  loadPortfoliosSearch,
  removePortfolio,
  retweet,
  unlikePortfolio,
  unscrapPortfolio,
  updatePortfolio,
  uploadImages,
  loadUserPortfolios,
  loadMyPortfolios,
} from "../actions/portfolio";
//수정중
const initialState = {
  mainPortfolios: [],
  hasMorePortfolios: true, // 다음 portfolios 여부
  imagePaths: [],
  loadPortfoliosLoading: false,
  loadPortfoliosDone: false,
  loadPortfoliosError: null,
  addPortfolioLoading: false,
  addPortfolioDone: false,
  addPortfolioError: null,
  updatePortfolioLoading: false,
  updatePortfolioDone: false,
  updatePortfolioError: null,
  removePortfolioLoading: false,
  removePortfolioDone: false,
  removePortfolioError: null,
  addCommentLoading: false,
  addCommentDone: false,
  addCommentError: null,
  likePortfolioLoading: false,
  likePortfolioDone: false,
  likePortfolioError: null,
  scrapPortfolioLoading: false,
  scrapPortfolioDone: false,
  scrapPortfolioError: null,
  uploadImagesLoading: false,
  uploadImagesDone: false,
  uploadImagesError: null,
  myPortfolios: null,
  loadMyPortfoliosLoading: false,
  loadMyPortfoliosDone: false,
  loadMyPortfoliosError: false,
  singlePortfolio: {
    title: "",
    skills: [],
    description: "",
    image: {},
    content: "",
    comments: [],
    contentText: "",
  },
};

const portfolioSlice = createSlice({
  name: "portfolio",
  initialState,
  reducers: {
    updateState(state, action) {
      return { ...state, singlePortfolio: { ...action.payload } };
    },
  },
  extraReducers: (builder) =>
    builder
      // loadPortfolios
      .addCase(loadPortfolios.pending, (state) => {
        state.loadPortfoliosLoading = true;
        state.loadPortfoliosDone = false;
        state.loadPortfoliosError = null;
      })
      .addCase(loadPortfolios.fulfilled, (state, action) => {
        state.loadPortfoliosLoading = false;
        state.loadPortfoliosDone = true;
        state.mainPortfolios = _concat(state.mainPortfolios, action.payload);
        state.hasMorePortfolios = action.payload.length === 12;
      })
      .addCase(loadPortfolios.rejected, (state, action) => {
        state.loadPortfoliosLoading = false;
        state.loadPortfoliosError = action.error.message;
      })
      // loadPortfoliosSearch
      .addCase(loadPortfoliosSearch.pending, (state) => {
        state.loadPortfoliosLoading = true;
        state.loadPortfoliosDone = false;
        state.loadPortfoliosError = null;
      })
      .addCase(loadPortfoliosSearch.fulfilled, (state, action) => {
        state.loadPortfoliosLoading = false;
        state.loadPortfoliosDone = true;
        state.mainPortfolios = _concat(state.mainPortfolios, action.payload);
        state.hasMorePortfolios = action.payload.length === 12;
      })
      .addCase(loadPortfoliosSearch.rejected, (state, action) => {
        state.loadPortfoliosLoading = false;
        state.loadPortfoliosError = action.error.message;
      })
      // loadHashtagPortfolios
      .addCase(loadHashtagPortfolios.pending, (state) => {
        state.loadPortfoliosLoading = true;
        state.loadPortfoliosDone = false;
        state.loadPortfoliosError = null;
      })
      .addCase(loadHashtagPortfolios.fulfilled, (state, action) => {
        state.loadPortfoliosLoading = false;
        state.loadPortfoliosDone = true;
        state.mainPortfolios = _concat(state.mainPortfolios, action.payload);
        state.hasMorePortfolios = action.payload.length === 10;
      })
      .addCase(loadHashtagPortfolios.rejected, (state, action) => {
        state.loadPortfoliosLoading = false;
        state.loadPortfoliosError = action.error.message;
      })
      // loadUserPortfolios
      // .addCase(loadUserPortfolios.pending, (state) => {
      //   state.loadPortfoliosLoading = true;
      //   state.loadPortfoliosDone = false;
      //   state.loadPortfoliosError = null;
      // })
      // .addCase(loadUserPortfolios.fulfilled, (state, action) => {
      //   state.loadPortfoliosLoading = false;
      //   state.loadPortfoliosDone = true;
      //   state.mainPortfolios = _concat(state.mainPortfolios, action.payload);
      //   state.hasMorePortfolios = action.payload.length === 10;
      // })
      // .addCase(loadUserPortfolios.rejected, (state, action) => {
      //   state.loadPortfoliosLoading = false;
      //   state.loadPortfoliosError = action.error.message;
      // })
      // addPortfolio
      .addCase(addPortfolio.pending, (state) => {
        state.addPortfolioLoading = true;
        state.addPortfolioDone = false;
        state.addPortfolioError = null;
      })
      .addCase(addPortfolio.fulfilled, (state, action) => {
        state.addPortfolioLoading = false;
        state.addPortfolioDone = true;
        state.mainPortfolios.unshift(action.payload);
        state.imagePaths = [];
      })
      .addCase(addPortfolio.rejected, (state, action) => {
        state.addPortfolioLoading = false;
        state.addPortfolioError = action.error.message;
      })
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
      })
      .addCase(uploadImages.rejected, (state, action) => {
        state.uploadImagesLoading = false;
        state.uploadImagesError = action.error.message;
      })
      // addComment
      .addCase(addComment.pending, (state) => {
        state.addCommentLoading = true;
        state.addCommentDone = false;
        state.addCommentError = null;
      })
      .addCase(addComment.fulfilled, (state, action) => {
        //const portfolio = _find(state.mainPortfolios, { _id: action.payload.portfolioId });
        state.addCommentLoading = false;
        state.addCommentDone = true;
        state.singlePortfolio.comments.unshift(action.payload);
      })
      .addCase(addComment.rejected, (state, action) => {
        state.addCommentLoading = false;
        state.addCommentError = action.error.message;
      })
      // removePortfolio
      .addCase(removePortfolio.pending, (state) => {
        state.removePortfolioLoading = true;
        state.removePortfolioDone = false;
        state.removePortfolioError = null;
      })
      .addCase(removePortfolio.fulfilled, (state, action) => {
        state.removePortfolioLoading = false;
        state.removePortfolioDone = true;
        _remove(state.mainPortfolios, { id: action.payload.PortfolioId });
      })
      .addCase(removePortfolio.rejected, (state, action) => {
        state.removePortfolioLoading = false;
        state.removePortfolioError = action.error.message;
      })
      // scrapPortfolio
      .addCase(scrapPortfolio.pending, (state) => {
        state.scrapPortfolioLoading = true;
        state.scrapPortfolioDone = false;
        state.scrapPortfolioError = null;
      })
      .addCase(scrapPortfolio.fulfilled, (state, action) => {
        state.scrapPortfolioLoading = false;
        state.scrapPortfolioDone = true;
        state.singlePortfolio.scraps.push(action.payload.UserId);
      })
      .addCase(scrapPortfolio.rejected, (state, action) => {
        state.scrapPortfolioLoading = false;
        state.scrapPortfolioError = action.error.message;
      })
      // unscrapPortfolio
      .addCase(unscrapPortfolio.pending, (state) => {
        state.scrapPortfolioLoading = true;
        state.scrapPortfolioDone = false;
        state.scrapPortfolioError = null;
      })
      .addCase(unscrapPortfolio.fulfilled, (state, action) => {
        state.scrapPortfolioLoading = false;
        state.scrapPortfolioDone = true;
        _remove(state.singlePortfolio.scraps, function (c) {
          return c === action.payload.UserId;
        });
      })
      .addCase(unscrapPortfolio.rejected, (state, action) => {
        state.scrapPortfolioLoading = false;
        state.scrapPortfolioError = action.error.message;
      })
      // likePortfolio
      .addCase(likePortfolio.pending, (state) => {
        state.likePortfolioLoading = true;
        state.likePortfolioDone = false;
        state.likePortfolioError = null;
      })
      .addCase(likePortfolio.fulfilled, (state, action) => {
        //const portfolio = _find(state.mainPortfolios, { id: action.payload.PortfolioId });
        state.likePortfolioLoading = false;
        state.likePortfolioDone = true;
        state.singlePortfolio.recommends.push(action.payload.UserId);
      })
      .addCase(likePortfolio.rejected, (state, action) => {
        state.likePortfolioLoading = false;
        state.likePortfolioError = action.error.message;
      })
      // unlikePortfolio
      .addCase(unlikePortfolio.pending, (state) => {
        state.likePortfolioLoading = true;
        state.likePortfolioDone = false;
        state.likePortfolioError = null;
      })
      .addCase(unlikePortfolio.fulfilled, (state, action) => {
        //const portfolio = _find(state.mainPortfolios, { id: action.payload.PortfolioId });
        state.likePortfolioLoading = false;
        state.likePortfolioDone = true;

        _remove(state.singlePortfolio.recommends, function (c) {
          return c === action.payload.UserId;
        });
      })
      .addCase(unlikePortfolio.rejected, (state, action) => {
        state.likePortfolioLoading = false;
        state.likePortfolioError = action.error.message;
      })
      // retweet
      .addCase(retweet.pending, (state) => {
        state.retweetLoading = true;
        state.retweetDone = false;
        state.retweetError = null;
      })
      .addCase(retweet.fulfilled, (state, action) => {
        state.retweetLoading = false;
        state.retweetDone = true;
        state.mainPortfolios.unshift(action.payload);
      })
      .addCase(retweet.rejected, (state, action) => {
        state.retweetLoading = false;
        state.retweetError = action.error.message;
      })
      // updatePortfolio
      .addCase(updatePortfolio.pending, (state) => {
        state.updatePortfolioLoading = true;
        state.updatePortfolioDone = false;
        state.updatePortfolioError = null;
      })
      .addCase(updatePortfolio.fulfilled, (state, action) => {
        const portfolio = _find(state.mainPortfolios, { id: action.payload.PortfolioId });
        state.updatePortfolioLoading = false;
        state.updatePortfolioDone = true;
        portfolio.content = action.payload.content;
      })
      .addCase(updatePortfolio.rejected, (state, action) => {
        state.updatePortfolioLoading = false;
        state.updatePortfolioError = action.error.message;
      })
      // loadPortfolio
      .addCase(loadPortfolio.pending, (state) => {
        state.loadPortfoliosLoading = true;
        state.loadPortfoliosDone = false;
        state.loadPortfoliosError = null;
      })
      .addCase(loadPortfolio.fulfilled, (state, action) => {
        console.log(action.payload);
        state.loadPortfoliosLoading = false;
        state.loadPortfoliosDone = true;
        state.singlePortfolio = action.payload;
      })
      .addCase(loadPortfolio.rejected, (state, action) => {
        state.loadPortfoliosLoading = false;
        state.loadPortfoliosError = action.error.message;
      })
      // loadUserPortfolios
      .addCase(loadMyPortfolios.pending, (state) => {
        console.log("pending");
        state.loadMyPortfoliosLoading = true;
        state.loadMyPortfoliosDone = false;
        state.loadMyPortfoliosError = null;
      })
      .addCase(loadMyPortfolios.fulfilled, (state, action) => {
        console.log("fulfilled");
        state.loadMyPortfoliosLoading = false;
        state.loadMyPortfoliosDone = true;
        state.myPortfolios = action.payload;
      })
      .addCase(loadMyPortfolios.rejected, (state, action) => {
        state.loadMyPortfoliosLoading = false;
        state.loadMyPortfoliosError = action.error.message;
      })
      .addDefaultCase((state) => state),
});

export const portfolioActions = portfolioSlice.actions;
export default portfolioSlice;
