import * as api from "../api";
import {
  CREATE_AUTHOR,
  CREATE_FAILED,
  CREATE_SUCCESS,
  END_LOADING_AUTHOR,
  GET_ALL_AUTHOR,
  GET_BY_ID_AUTHOR,
  START_LOADING_AUTHOR,
  UPDATE_AUTHOR,
} from "../constants/actionTypes";

export const createAuthor = (author) => async (dispatch) => {
  try {
    dispatch({ type: START_LOADING_AUTHOR });
    dispatch({ type: CREATE_AUTHOR });
    const { data } = await api.createAuthor(author);

    if (data.data === null) {
      dispatch({ type: CREATE_FAILED, message: data.message });
      dispatch({ type: END_LOADING_AUTHOR });
    } else {
      dispatch({ type: CREATE_SUCCESS, payload: data.data });
      dispatch({ type: END_LOADING_AUTHOR });
    }
  } catch (error) {
    console.log(error);
  }
};

export const getAuthors = () => async (dispatch) => {
  try {
    dispatch({ type: START_LOADING_AUTHOR });
    const { data } = await api.getAuthors();
    dispatch({ type: GET_ALL_AUTHOR, payload: data });
    dispatch({ type: END_LOADING_AUTHOR });
  } catch (error) {
    console.log(error.message);
  }
};

export const getAuthorById = (id) => async (dispatch) => {
  try {
    dispatch({ type: START_LOADING_AUTHOR });
    const {
      data: { data },
    } = await api.getAuthorById(id);
    dispatch({ type: GET_BY_ID_AUTHOR, payload: { data } });
    dispatch({ type: END_LOADING_AUTHOR });
  } catch (error) {
    console.log(error);
  }
};

export const updateAuthor = (id, author) => async (dispatch) => {
  try {
    const { data } = await api.updateAuthor(id, author);

    dispatch({ type: UPDATE_AUTHOR, payload: data });
  } catch (error) {
    console.log(error);
  }
};
