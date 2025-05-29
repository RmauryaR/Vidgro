import request from "../../api";
import {
  COMMENT_LIST_FAIL,
  COMMENT_LIST_REQUEST,
  COMMENT_LIST_SUCCESS,
  CREATE_COMMENT_FAIL,
  CREATE_COMMENT_SUCCESS,
} from "../actionType";

export const getCommentsOfVideoById = (id) => async (dispatch) => {
  try {
    dispatch({ type: COMMENT_LIST_REQUEST });

    const { data } = await request.get("/commentThreads", {
      params: {
        part: "snippet",
        videoId: id,
      },
    });

    dispatch({
      type: COMMENT_LIST_SUCCESS,
      payload: data.items,
    });
  } catch (error) {
    console.error("Error fetching comments:", error);
    dispatch({
      type: COMMENT_LIST_FAIL,
      payload:
        error?.response?.data?.message ||
        error?.message ||
        "Failed to load comments",
    });
  }
};

export const addComment = (id, text) => async (dispatch, getState) => {
  const token = getState().auth?.accessToken;
  if (!token) {
    dispatch({
      type: CREATE_COMMENT_FAIL,
      payload: "You must be logged in to comment.",
    });
    return;
  }

  try {
    const obj = {
      snippet: {
        videoId: id,
        topLevelComment: {
          snippet: {
            textOriginal: text,
          },
        },
      },
    };

    const { data } = await request.post("/commentThreads", obj, {
      params: {
        part: "snippet",
      },
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    console.log("API response:", data);

    dispatch({
      type: CREATE_COMMENT_SUCCESS,
    });

    dispatch(getCommentsOfVideoById(id));
    setTimeout(() => dispatch(getCommentsOfVideoById(id)), 2000);
  } catch (error) {
    console.error("Error adding comment:", error);
    dispatch({
      type: CREATE_COMMENT_FAIL,
      payload:
        error?.response?.data?.message ||
        error?.message ||
        "Failed to add comment",
    });
  }
};
