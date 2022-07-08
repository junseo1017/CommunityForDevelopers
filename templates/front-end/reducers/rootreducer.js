import { combineReducers } from "redux";
import { HYDRATE } from "next-redux-wrapper";

import UISlice from "./ui";

const rootReducer = (state, action) => {
  switch (action.type) {
    case HYDRATE:
      return action.payload;
    default: {
      const combinedReducer = combineReducers({
        ui: UISlice.reducer,
      });
      return combinedReducer(state, action);
    }
  }
};

export default rootReducer;
