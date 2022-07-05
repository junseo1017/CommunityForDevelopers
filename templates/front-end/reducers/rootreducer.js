import { combineReducers } from 'redux';
import { HYDRATE } from 'next-redux-wrapper';
const rootReducer = (state, action) => {
  switch (action.type) {
    case HYDRATE:
      return action.payload;
    default: {
      const combinedReducer = combineReducers({
        // signin: signInSlice.reducer,
        // 위 예시 참고 key(자유롭게 작성 useDispatch에서 사용됨) : slice.reducer
      });
      return combinedReducer(state, action);
    }
  }
};

export default rootReducer;
