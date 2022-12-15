import { ADD_TODO, DELETE_TODO, GET_ALL_TODO, UPDATE_TODO } from "../constant/Index";

export const getAllTodoSet = (state) => {
  return {
    type: GET_ALL_TODO,
    payload: state,
  };
};

export const addTodoSet = (state) => {
    return {
      type: ADD_TODO,
      payload: state,
    };
}

export const deleteTodoSet = (state) => {
  return { type: DELETE_TODO, payload: state };
};


export const updateTodoSet = (state) => {
    return {
        type: UPDATE_TODO,
        payload: state,
    };
}