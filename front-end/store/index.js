import { configureStore } from "@reduxjs/toolkit";
import { createWrapper } from "next-redux-wrapper";
import rootReducer from "../reducers/rootreducer";
import { getDefaultMiddleware } from "@reduxjs/toolkit";

const isDev = process.env.NODE_ENV === "development";
const createStore = () => {
  const store = configureStore({
    reducer: rootReducer,
    devTools: isDev,
  });
  return store;
};

const wrapper = createWrapper(createStore, {
  debug: isDev,
});

export default wrapper;
