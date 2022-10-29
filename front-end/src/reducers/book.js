import {
  START_LOADING_BOOK,
  END_LOADING_BOOK,
  GET_ALL_BOOK,
  GET_BY_ID_BOOK,
  CREATE_BOOK,
  UPDATE_BOOK,
} from "../constants/actionTypes";

// eslint-disable-next-line
export default (
  state = { isLoading: false, books: [], book: null },
  action
) => {
  switch (action.type) {
    case START_LOADING_BOOK:
      return { ...state, isLoading: true };
    case END_LOADING_BOOK:
      return { ...state, isLoading: false };
    case GET_ALL_BOOK:
      return {
        ...state,
        books: action.payload.data,
        currentPage: action.payload.currentPage,
        numberOfPages: action.payload.numberOfPages,
      };
    case GET_BY_ID_BOOK:
      return { ...state, book: action.payload.data };
    case CREATE_BOOK:
      return { ...state, books: [...state, action.payload] };
    case UPDATE_BOOK:
      return {
        ...state,
        books: state.books.map((book) =>
          book._id === action.payload._id ? action.payload : book
        ),
      };
    default:
      return state;
  }
};
