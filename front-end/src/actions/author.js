import * as api from "../api";
import { CREATE } from "../constants/actionTypes";


export const createAuthor = (author) => async (dispatch) => {
    try {
      dispatch({type:START_LOADING});
      const { data } = await api.createAuthor(author);
      dispatch({ type: CREATE, payload: data });
      dispatch({type:END_LOADING});
    } catch (error) {
      console.log(error);
    }
  };
  