import {
  HOME_VIDEOS_FAIL,
  HOME_VIDEOS_REQUEST,
  HOME_VIDEOS_SUCCESS,
  RELATED_VIDEO_FAIL,
  RELATED_VIDEO_REQUEST,
  RELATED_VIDEO_SUCCESS,
  SEARCHED_VIDEO_FAIL,
  SEARCHED_VIDEO_REQUEST,
  SEARCHED_VIDEO_SUCCESS,
  SELECTED_VIDEOS_FAIL,
  SELECTED_VIDEOS_REQUEST,
  SELECTED_VIDEOS_SUCCESS,
  SUBSCRIPTION_CHANNEL_FAIL,
  SUBSCRIPTION_CHANNEL_REQUEST,
  SUBSCRIPTION_CHANNEL_SUCCESS,
  CHANNEL_VIDEOS_FAIL,
  CHANNEL_VIDEOS_REQUEST,
  CHANNEL_VIDEOS_SUCCESS,
} from "../actionType";
import request from "../../api";

// Helper for safe error messages
const getErrorMessage = (error) =>
  error.response?.data?.message || error.message || "Something went wrong";

export const getPopularVideos = () => async (dispatch, getState) => {
  try {
    dispatch({ type: HOME_VIDEOS_REQUEST });

    const response = await request.get("/videos", {
      params: {
        part: "snippet,contentDetails,statistics",
        chart: "mostPopular",
        regionCode: "IN",
        maxResults: 21,
        pageToken: getState().homeVideos.nextPageToken,
      },
    });

    if (response?.data?.items) {
      dispatch({
        type: HOME_VIDEOS_SUCCESS,
        payload: {
          videos: response.data.items,
          nextPageToken: response.data.nextPageToken,
          category: "All",
        },
      });
    } else {
      dispatch({
        type: HOME_VIDEOS_FAIL,
        payload: "No videos found",
      });
    }
  } catch (error) {
    dispatch({
      type: HOME_VIDEOS_FAIL,
      payload: getErrorMessage(error),
    });
  }
};

export const getVideosByCategory = (keyword) => async (dispatch, getState) => {
  try {
    dispatch({ type: HOME_VIDEOS_REQUEST });

    const response = await request.get("/search", {
      params: {
        part: "snippet",
        maxResults: 20,
        pageToken: getState().homeVideos.nextPageToken,
        q: keyword,
        type: "video",
      },
    });

    if (response?.data?.items) {
      dispatch({
        type: HOME_VIDEOS_SUCCESS,
        payload: {
          videos: response.data.items,
          nextPageToken: response.data.nextPageToken,
          category: keyword,
        },
      });
    } else {
      dispatch({
        type: HOME_VIDEOS_FAIL,
        payload: "No videos found for this category",
      });
    }
  } catch (error) {
    dispatch({
      type: HOME_VIDEOS_FAIL,
      payload: getErrorMessage(error),
    });
  }
};

export const getVideoById = (id) => async (dispatch) => {
  try {
    dispatch({ type: SELECTED_VIDEOS_REQUEST });

    const response = await request.get("/videos", {
      params: {
        part: "snippet,statistics",
        id,
      },
    });

    console.log("API getVideoById response:", response);

    const data = response?.data || { items: [] };
    const video = data.items && data.items.length > 0 ? data.items[0] : {};

    dispatch({
      type: SELECTED_VIDEOS_SUCCESS,
      payload: video,
    });
  } catch (error) {
    dispatch({
      type: SELECTED_VIDEOS_FAIL,
      payload:
        error.response?.data?.message ||
        error.message ||
        "Something went wrong",
    });
  }
};

export const getRelatedVideos = (id) => async (dispatch) => {
  try {
    dispatch({ type: RELATED_VIDEO_REQUEST });

    const response = await request.get("/search", {
      params: {
        part: "snippet",
        relatedToVideoId: id,
        maxResults: 15,
        type: "video",
      },
    });

    if (response?.data?.items && response.data.items.length > 0) {
      dispatch({
        type: RELATED_VIDEO_SUCCESS,
        payload: response.data.items,
      });
    } else {
      dispatch({
        type: RELATED_VIDEO_FAIL,
        payload: "No related videos found",
      });
    }
  } catch (error) {
    dispatch({
      type: RELATED_VIDEO_FAIL,
      payload: getErrorMessage(error),
    });
  }
};

export const getVideosBySearch = (keyword) => async (dispatch) => {
  try {
    dispatch({ type: SEARCHED_VIDEO_REQUEST });

    const response = await request.get("/search", {
      params: {
        part: "snippet",
        maxResults: 20,
        q: keyword,
        type: "video,channel",
      },
    });

    if (response?.data?.items) {
      dispatch({
        type: SEARCHED_VIDEO_SUCCESS,
        payload: response.data.items,
      });
    } else {
      dispatch({
        type: SEARCHED_VIDEO_FAIL,
        payload: "No results found for your search",
      });
    }
  } catch (error) {
    dispatch({
      type: SEARCHED_VIDEO_FAIL,
      payload: getErrorMessage(error),
    });
  }
};

export const getSubscribedChannel = () => async (dispatch, getState) => {
  try {
    dispatch({ type: SUBSCRIPTION_CHANNEL_REQUEST });

    const response = await request.get("/subscriptions", {
      params: {
        part: "snippet,contentDetails",
        mine: true,
      },
      headers: {
        Authorization: `Bearer ${getState().auth.accessToken}`,
      },
    });

    if (response?.data?.items) {
      dispatch({
        type: SUBSCRIPTION_CHANNEL_SUCCESS,
        payload: response.data.items,
      });
    } else {
      dispatch({
        type: SUBSCRIPTION_CHANNEL_FAIL,
        payload: "No subscription data found",
      });
    }
  } catch (error) {
    dispatch({
      type: SUBSCRIPTION_CHANNEL_FAIL,
      payload: getErrorMessage(error),
    });
  }
};

export const getVideosByChannel = (id) => async (dispatch) => {
  try {
    dispatch({ type: CHANNEL_VIDEOS_REQUEST });

    const response = await request.get("/channels", {
      params: {
        part: "contentDetails",
        id,
      },
    });

    const items = response?.data?.items;

    const uploadPlaylistId =
      items?.[0]?.contentDetails?.relatedPlaylists?.uploads;

    if (!uploadPlaylistId) {
      dispatch({
        type: CHANNEL_VIDEOS_FAIL,
        payload: "Could not find uploads playlist for this channel",
      });
      return;
    }

    const playlistResponse = await request.get("/playlistItems", {
      params: {
        part: "snippet,contentDetails",
        playlistId: uploadPlaylistId,
        maxResults: 30,
      },
    });

    if (playlistResponse?.data?.items) {
      dispatch({
        type: CHANNEL_VIDEOS_SUCCESS,
        payload: playlistResponse.data.items,
      });
    } else {
      dispatch({
        type: CHANNEL_VIDEOS_FAIL,
        payload: "No videos found in this channel's uploads playlist",
      });
    }
  } catch (error) {
    dispatch({
      type: CHANNEL_VIDEOS_FAIL,
      payload: getErrorMessage(error),
    });
  }
};
