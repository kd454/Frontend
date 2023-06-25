import { ActionTypes } from "../constant/action_type";

const initialState = {
  loginDetail: "",
};

const loginReducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.LOGIN:
      return { ...state, loginDetail: action.payload };
    case ActionTypes.SET_LOGIN:
      return { ...state, loginDetail: "" };
    default:
      return state;
  }
};

export default loginReducer;
