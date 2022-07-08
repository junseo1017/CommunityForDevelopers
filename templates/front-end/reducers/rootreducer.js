import { combineReducers } from "redux";
import { HYDRATE } from "next-redux-wrapper";
<<<<<<< HEAD
import UISlice from "./ui";
=======
>>>>>>> ae776c104045f2a6bce25af814e66a2cbda0c6c9
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
