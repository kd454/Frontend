import teachersApi from "../../apis/teachersApi";
import { ActionTypes } from "../constant/action_type";

export const setStudentDetail = (data) => {
  return async (dispatch) => {
    try {
      const values = await teachersApi.post(
        "/api/Student/StudentRegistration",
        data
      );
      dispatch({ type: ActionTypes.SET_STUDENT_DETAIL, payload: values.data });
    } catch (error) {
      console.log(error);
    }
  };
};

export const studentAlreadyRegistered = (email) => {
  return async (dispatch) => {
    try {
      const data = await teachersApi.get(
        `/api/Student/IsStudentAlreadyRegistered`,
        {
          params: {
            email,
          },
        }
      );
      dispatch({
        type: ActionTypes.IS_STUDENT_ALREADY_REGISTERED,
        payload: data.data,
      });
    } catch (error) {
      console.log(error);
    }
  };
};

export const sendTeachersDetails = (received) => {
  return async (dispatch) => {
    try {
      const data = await teachersApi.post(
        `/api/Student/SendTeacherDetails`,
        received
      );
      dispatch({
        type: ActionTypes.SEND_TEACHER_DETAIL,
        payload: data.data,
      });
    } catch (error) {
      console.log(error);
    }
  };
};

export const studentHistory = (id) => {
  const teacherId = parseInt(id);
  return async (dispatch) => {
    try {
      const data = await teachersApi.get(`/api/Student/StudentHistory`, {
        params: {
          teacherId,
        },
      });
      dispatch({
        type: ActionTypes.GET_STUDENT_HISTORY,
        payload: data.data,
      });
    } catch (error) {
      console.log(error);
    }
  };
};

export const cleanUp = () => {
  return {
    type: ActionTypes.CLEAN_STUDENT_STATE,
  };
};
