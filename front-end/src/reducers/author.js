import {
  START_LOADING_AUTHOR,
  END_LOADING_AUTHOR,
  GET_ALL_AUTHOR,
  GET_BY_ID_AUTHOR,
  CREATE_AUTHOR,
  UPDATE_AUTHOR,
  CREATE_SUCCESS,
  CREATE_FAILED,
} from "../constants/actionTypes";

const initState = {
  isLoading: false,
  authors: [],
  message: "",
  author: null,
};

// eslint-disable-next-line
export default (state = initState, action) => {
  switch (action.type) {
    case START_LOADING_AUTHOR:
      initState.isLoading = true;
      return initState;
    case END_LOADING_AUTHOR:
      initState.isLoading = false;
      return initState;
    case GET_ALL_AUTHOR:
      return {
        ...state,
        authors: action.payload.data,
        currentPage: action.payload.currentPage,
        numberOfPages: action.payload.numberOfPages,
      };
    case GET_BY_ID_AUTHOR:
      return { ...state, authors: action.payload.data };
    case CREATE_AUTHOR:
      return initState;
    case CREATE_SUCCESS:
      initState.author = action.payload;
      return initState;
    case CREATE_FAILED:
      initState.message = action.message;
      initState.author = null;
      return initState;
    case UPDATE_AUTHOR:
      return {
        ...state,
        authors: state.authors.map((author) =>
          author._id === action.payload._id ? action.payload : author
        ),
      };
    default:
      return state;
  }
};
