import { ActionTypes } from "../constant/action_type";
import teachersApi from "../../apis/teachersApi";

export const login = (data) => {
  return async (dispatch) => {
    try {
      const returnData = await teachersApi.post("/api/User/login", data);
      dispatch({ type: ActionTypes.LOGIN, payload: returnData.data });
    } catch (error) {
      dispatch({ type: ActionTypes.LOGIN, payload: error.response.data });
    }
  };
};

export const setLogin = () => {
  return {
    type: ActionTypes.SET_LOGIN,
  };
};
