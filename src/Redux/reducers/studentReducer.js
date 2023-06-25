import { ActionTypes } from "../constant/action_type";
const initialState = {
  studentDetail: {},
  isStudentAlreadyRegister: {},
  sendTeacherDetail: {},
  studentHistoryData: [],
};

const studentReducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.SET_STUDENT_DETAIL:
      return { ...state, studentDetail: action.payload };
    case ActionTypes.IS_STUDENT_ALREADY_REGISTERED:
      return { ...state, isStudentAlreadyRegister: action.payload };
    case ActionTypes.SEND_TEACHER_DETAIL:
      return { ...state, sendTeacherDetail: action.payload };
    case ActionTypes.GET_STUDENT_HISTORY:
      return { ...state, studentHistoryData: action.payload };
    case ActionTypes.CLEAN_STUDENT_STATE:
      return { ...initialState };
    default:
      return state;
  }
};

export default studentReducer;
