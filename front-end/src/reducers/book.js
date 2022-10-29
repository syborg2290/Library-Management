import { GET_ALL,START_LOADING,END_LOADING,UPDATE,CREATE, GET_BY_ID } from "../constants/actionTypes";

export default (state = {isLoading:true, books:[]}, action) => {
    switch (action.type) {
      case START_LOADING:
        return {...state, isLoading:true};
        case END_LOADING:
          return {...state, isLoading:false};
      case GET_ALL:
        return {
          ...state,
         books: action.payload.data,
         currentPage:action.payload.currentPage,
         numberOfPages:action.payload.numberOfPages,
        };
      case GET_BY_ID:
        return {...state, author: action.payload.data};
      case CREATE:
        return {...state, book: [...state, action.payload]};
        case UPDATE:
        return {...state, book: state.book.map((book) => (book._id === action.payload._id ? action.payload : book))};
      default:
        return state;
    }
  };
  