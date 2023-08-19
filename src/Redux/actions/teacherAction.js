import teachersApi from "../../apis/teachersApi";
import { ActionTypes } from "../constant/action_type";

export const getTeacherDetail = (data) => {
  return async (dispatch) => {
    try {
      const values = await teachersApi.post(
        "/api/Teacher/GetTeacherDetails",
        data
      );
      dispatch({ type: ActionTypes.GET_TEACHER_DETAIL, payload: values.data });
    } catch (error) {
      console.log(error);
    }
  };
};

export const setAllTeacherDetail = () => {
  return {
    type: ActionTypes.SET_ALL_TEACHER_DETAIL,
  };
};

export const regitrationWithBatchDetail = (data) => {
  return async (dispatch) => {
    try {
      const values = await teachersApi.post(
        "/api/Teacher/TeacherRegistration",
        data
      );
      dispatch({
        type: ActionTypes.SET_TEACHER_REGISTRAION,
        payload: values.data,
      });
    } catch (error) {
      console.log(error);
    }
  };
};

export const setTeacherRegistration = (data) => {
  return {
    type: ActionTypes.REGISTER_DATA,
    payload: data,
  };
};

export const isEmailorPhoneAlreadyexist = (values) => {
  const { email, phone } = values;
  return async (dispatch) => {
    try {
      const data = await teachersApi.post(
        `/api/Teacher/IsEmailorPhoneAlreadyExist`,
        null,
        {
          params: {
            email,
            phone,
          },
        }
      );
      dispatch({ type: ActionTypes.IS_EMAIL_ID_VALID, payload: data.data });
    } catch (error) {
      console.log(error);
    }
  };
};

export const setEmailState = (data) => {
  return {
    type: ActionTypes.SET_EMAIL_STATE,
    payload: data,
  };
};

export const setFilterData = (data) => {
  return {
    type: ActionTypes.SET_FILTER_DATA,
    payload: data,
  };
};

export const setFilterObjectRedux = (data) => {
  return {
    type: ActionTypes.SET_FILTER_OBJECT,
    payload: data,
  };
};

export const setLocalBatch = (data) => {
  return {
    type: ActionTypes.SET_LOCAL_BATCH,
    payload: data,
  };
};

export const getTeachersDetailById = (id) => {
  const userId = parseInt(id);
  return async (dispatch) => {
    try {
      const data = await teachersApi.get(
        `/api/Teacher/GetTeacherDetailsByUserId`,
        {
          params: {
            userId,
          },
        }
      );
      dispatch({
        type: ActionTypes.GET_TEACHER_DETAIL_BY_ID,
        payload: data.data,
      });
    } catch (error) {
      console.log(error);
    }
  };
};

export const updateTeacherDetails = (data) => {
  return async (dispatch) => {
    try {
      const values = await teachersApi.post(
        "/api/Teacher/UpdateTeacherDetails",
        data
      );
      dispatch({
        type: ActionTypes.UPDATE_TEACHER_DETAILS,
        payload: values.data,
      });
    } catch (error) {
      console.log(error);
    }
  };
};

export const setTeacherDetail = () => {
  return {
    type: ActionTypes.SET_TEACHER_DETAIL,
  };
};
