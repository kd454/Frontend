import { combineReducers } from "redux";
import homeReducer from "./homeReducer";
import teacherReducer from "./teacherReducer";
import studentReducer from "./studentReducer";
import loginReducer from "./loginReducer";
const AllReducer = combineReducers({
  teacherRedu: teacherReducer,
  loginRedu: loginReducer,
  homeRedu: homeReducer,
  studentRedu: studentReducer,
});

export default AllReducer;
