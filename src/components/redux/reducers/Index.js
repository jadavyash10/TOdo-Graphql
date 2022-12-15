import { combineReducers } from "redux";
import todoReducer from "./TodoReducers";

const rootReducer = combineReducers({
  todoReducer: todoReducer,
});

export default rootReducer;