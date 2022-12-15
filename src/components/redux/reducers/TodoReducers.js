import {
  ADD_TODO,
  DELETE_TODO,
  GET_ALL_TODO,
  UPDATE_TODO,
} from "../constant/Index";

const initialState = {
  data: [],
};

const todoReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ALL_TODO:
      return {
        ...state,
        data: action.payload,
      };

    case ADD_TODO:
      return {
        ...state,
        data: [...state.data, action.payload],
      };

    case UPDATE_TODO:
      const index = state.data.findIndex(
        (item) => item.id === action.payload.id
      );
      const newArray = [...state.data];
      newArray[index] = { ...action.payload };

      return {
        ...state,
        data: newArray,
      };

    case DELETE_TODO:
      return {
        ...state,
        data: state.data.filter((todo) => todo.id !== action.payload),
      };

    default:
      return state;
  }
};

export default todoReducer;
