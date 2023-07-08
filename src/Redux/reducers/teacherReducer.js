import { ActionTypes } from "../constant/action_type";

const initialState = {
  teacher: {},
  allteachers: [],
  teacherObjectWithBatch: {},
  isValidOrNot: {},
  filterData: [],
  filterObject: {},
  LocalBatch: [],
  loginDetail: "",
  teacherDetails: {},
  updateTeacherDetails: {},
};

const teacherReducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.GET_TEACHER_DETAIL:
      let newArr = [];
      if (action.payload.length == 0) {
        newArr = action.payload;
        newArr.push("Data not found");
        console.log(newArr);
        return { ...state, allteachers: newArr };
      } else {
        return { ...state, allteachers: action.payload };
      }

    case ActionTypes.REGISTER_DATA:
      return { ...state, teacher: action.payload };
    case ActionTypes.SET_TEACHER_REGISTRAION:
      return { ...state, teacherObjectWithBatch: action.payload };
    case ActionTypes.IS_EMAIL_ID_VALID:
      return { ...state, isValidOrNot: action.payload };
    case ActionTypes.SET_EMAIL_STATE:
      return { ...state, isValidOrNot: action.payload };
    case ActionTypes.SET_FILTER_DATA:
      return { ...state, filterData: action.payload };
    case ActionTypes.SET_FILTER_OBJECT:
      return { ...state, filterObject: action.payload };
    case ActionTypes.SET_LOCAL_BATCH:
      return { ...state, LocalBatch: action.payload };
    case ActionTypes.LOGIN:
      return { ...state, loginDetail: action.payload };
    case ActionTypes.SET_LOGIN:
      return { ...state, loginDetail: null };
    case ActionTypes.GET_TEACHER_DETAIL_BY_ID:
      return { ...state, teacherDetails: action.payload };
    case ActionTypes.SET_TEACHER_DETAIL:
      return { ...state, teacherDetails: {} };
    case ActionTypes.UPDATE_TEACHER_DETAILS:
      return { ...state, updateTeacherDetails: action.payload };
    default:
      return state;
  }
};

export default teacherReducer;
