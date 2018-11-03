import { applyMiddleware, createStore } from "redux";
import thunk from 'redux-thunk';
import {
  FETCH_OUTLINE_BEGIN,
  FETCH_OUTLINE_SUCCESS,
  FETCH_OUTLINE_FAILURE,
  CHAPTER_SELECTED
} from './Actions';

const initialState = {
  course: [],
  cselected: 0,
  loading: false,
  error: null
};

const reducer = (state = initialState, action) => {
  switch(action.type) {
  	case FETCH_OUTLINE_BEGIN:
      return {
        ...state,
        loading: true,
        error: null
      };
    case FETCH_OUTLINE_SUCCESS:
      return {
        ...state,
        loading: false,
        course: action.payload.course
      };
    case CHAPTER_SELECTED:
      return {
      	...state,
      	cselected: action.payload.selected
      };
    default:
      return state;
  }
};

const store = createStore(reducer, applyMiddleware(thunk));

export default store;