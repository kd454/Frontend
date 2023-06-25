import teachersApi from "../../apis/teachersApi";
import { ActionTypes } from "../constant/action_type";

export const getImpact = () => {
  return async (dispatch) => {
    try {
      const value = await teachersApi.get("/api/Home/ImpactDetails", {
        headers: {
          "Access-Control-Allow-Origin": "*",
        },
      });
      dispatch({ type: ActionTypes.GET_IMPACT, payload: value.data });
    } catch (error) {
      console.log(error);
    }
  };
};

export const getBlogs = () => {
  return async (dispatch) => {
    try {
      const value = await teachersApi.post("/api/User/GetBlogs", {
        headers: {
          "Access-Control-Allow-Origin": "*",
        },
      });
      dispatch({ type: ActionTypes.GET_BLOGS, payload: value.data });
    } catch (error) {
      console.log(error);
    }
  };
};
