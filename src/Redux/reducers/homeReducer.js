import { ActionTypes } from "../constant/action_type";

const initialState = {
  data: {},
  blogs: [],
};

const homeReducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.GET_IMPACT:
      return { ...state, data: action.payload };
    case ActionTypes.GET_BLOGS:
      return { ...state, blogs: action.payload };
    default:
      return state;
  }
};

export default homeReducer;
