import { GET_ALL,START_LOADING,END_LOADING,UPDATE,CREATE, GET_BY_ID } from "../constants/actionTypes";

export default (state = {isLoading:true, authors:[]}, action) => {
    switch (action.type) {
      case START_LOADING:
        return {...state, isLoading:true};
        case END_LOADING:
          return {...state, isLoading:false};
      case GET_ALL:
        return {
          ...state,
         authors: action.payload.data,
         currentPage:action.payload.currentPage,
         numberOfPages:action.payload.numberOfPages,
        };
      case GET_BY_ID:
        return {...state, author: action.payload.data};
      case CREATE:
        return {...state, author: [...state, action.payload]};
        case UPDATE:
        return {...state, author: state.authors.map((author) => (author._id === action.payload._id ? action.payload : author))};
      default:
        return state;
    }
  };
  