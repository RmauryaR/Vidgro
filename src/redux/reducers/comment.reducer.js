import {
  COMMENT_LIST_FAIL,
  COMMENT_LIST_REQUEST,
  COMMENT_LIST_SUCCESS,
  CREATE_COMMENT_FAIL,
  CREATE_COMMENT_SUCCESS,
} from "../actionType";

// Initial state for the comment reducer
const initialState = {
  loading: true,
  comments: [],
  error: null,
};

export const commentListReducer = (state = initialState, action) => {
  const { payload, type } = action;

  switch (type) {
    case COMMENT_LIST_REQUEST:
      return {
        ...state,
        loading: true,
      };

    case COMMENT_LIST_SUCCESS:
      return {
        ...state,
        comments: payload || [], // Ensure fallback to empty array if payload is undefined or null
        loading: false,
      };

    case COMMENT_LIST_FAIL:
      return {
        ...state,
        loading: false,
        error: payload, // Set the error message when the request fails
      };

    case CREATE_COMMENT_SUCCESS:
      return {
        ...state,
        loading: false, // Stop loading after comment creation
      };

    case CREATE_COMMENT_FAIL:
      return {
        ...state,
        loading: false,
        error: payload, // Set the error message when comment creation fails
      };

    default:
      return state;
  }
};
