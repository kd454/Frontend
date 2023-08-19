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
        return { ...state, allteachers: newArr };
      } else {
        const sortedData = sortingOfData(action.payload);
        return { ...state, allteachers: sortedData };
      }
    case ActionTypes.SET_ALL_TEACHER_DETAIL:
      return { ...state, allteachers: [] };
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

const sortingOfData = (data) => {
  console.log(data);
  let mArr = [];
  let kmArr = [];
  data?.forEach((item) => {
    if (item.distance.split(" ")[1] === "m") {
      mArr.push(item);
    } else {
      kmArr.push(item);
    }
  });
  mArr.sort((a, b) => {
    return a.distance.split(" ")[0] - b.distance.split(" ")[0];
  });
  kmArr.sort((a, b) => {
    return a.distance.split(" ")[0] - b.distance.split(" ")[0];
  });
  return [...mArr, ...kmArr];
};
export default teacherReducer;
