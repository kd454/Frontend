// import { applyMiddleware, createStore, compose } from "redux";
import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import AllReducer from "../Redux/reducers/index";
import thunk from "redux-thunk";

// const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = configureStore({
  reducer: AllReducer,
  middleware: [thunk],
});

export default store;
