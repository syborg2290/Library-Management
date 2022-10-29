import * as api from "../api";
import {
  CREATE_BOOK,
  END_LOADING_BOOK,
  GET_ALL_BOOK,
  GET_BY_ID_BOOK,
  START_LOADING_BOOK,
  UPDATE_BOOK,
} from "../constants/actionTypes";

export const createBook = (book) => async (dispatch) => {
  try {
    dispatch({ type: START_LOADING_BOOK });
    const { data } = await api.createBook(book);
    dispatch({ type: CREATE_BOOK, payload: data });
    dispatch({ type: END_LOADING_BOOK });
  } catch (error) {
    console.log(error);
  }
};

export const getBooks = (page) => async (dispatch) => {
  try {
    dispatch({ type: START_LOADING_BOOK });
    const { data } = await api.getBooks(page);
    dispatch({ type: GET_ALL_BOOK, payload: data });
    dispatch({ type: END_LOADING_BOOK });
  } catch (error) {
    console.log(error.message);
  }
};

export const getBookById = (id) => async (dispatch) => {
  try {
    dispatch({ type: START_LOADING_BOOK });
    const {
      data: { data },
    } = await api.getBookById(id);
    dispatch({ type: GET_BY_ID_BOOK, payload: { data } });
    dispatch({ type: END_LOADING_BOOK });
  } catch (error) {
    console.log(error);
  }
};

export const updateBook = (id, book) => async (dispatch) => {
  try {
    const { data } = await api.updateBook(id, book);

    dispatch({ type: UPDATE_BOOK, payload: data });
  } catch (error) {
    console.log(error);
  }
};
