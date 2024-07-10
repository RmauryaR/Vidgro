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
} from "../actionType";
import request from "../../api";

export const getPopularVideos = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: HOME_VIDEOS_REQUEST,
    });

    const { data } = await request.get("/videos", {
      params: {
        part: "snippet,contentDetails,statistics",
        chart: "mostPopular",
        regionCode: "IN",
        maxResults: 21,

        pageToken: getState().homeVideos.nextPageToken,
      },
    });
    dispatch({
      type: HOME_VIDEOS_SUCCESS,
      payload: {
        videos: data.items,
        nextPageToken: data.nextPageToken,
        category: "All",
      },
    });
  } catch (error) {
    console.log(error.message);

    dispatch({
      type: HOME_VIDEOS_FAIL,
      payload: error.message,
    });
  } finally {
    console.log("Request comtleted");
  }
};

export const getVideosByCategory = (keyword) => async (dispatch, getState) => {
  try {
    dispatch({
      type: HOME_VIDEOS_REQUEST,
    });

    const { data } = await request.get("/search", {
      params: {
        part: "snippet",
        maxResults: 20,
        pageToken: getState().homeVideos.nextPageToken,
        q: keyword,
        type: "video",
      },
    });
    dispatch({
      type: HOME_VIDEOS_SUCCESS,
      payload: {
        videos: data.items,
        nextPageToken: data.nextPageToken,
        category: keyword,
      },
    });
  } catch (error) {
    console.log(error.message);

    dispatch({
      type: HOME_VIDEOS_FAIL,
      payload: error.message,
    });
  } finally {
    console.log("Request comtleted");
  }
};

export const getVideoById = (id) => async (dispatch) => {
  try {
    dispatch({
      type: SELECTED_VIDEOS_REQUEST,
    });
    const { data } = await request.get("/videos", {
      params: {
        part: "snippet,statistics",
        id: id,
      },
    });

    dispatch({
      type: SELECTED_VIDEOS_SUCCESS,
      payload: data.items[0],
    });
  } catch (error) {
    console.log(error.message);
    dispatch({
      type: SELECTED_VIDEOS_FAIL,
      payload: error.message,
    });
  }
};

export const getRelatedVideos = (id) => async (dispatch) => {
  try {
    dispatch({
      type: RELATED_VIDEO_REQUEST,
    });
    const { data } = await request.get("/search", {
      params: {
        part: "snippet",
        relatedToVideoId: id,
        maxResults: 15,
        type: "video",
      },
    });

    dispatch({
      type: RELATED_VIDEO_SUCCESS,
      payload: data.items,
    });
  } catch (error) {
    console.log(error.response.data.message);
    dispatch({
      type: RELATED_VIDEO_FAIL,
      payload: error.response.data.message,
    });
  }
};

export const getVideosBySearch = (keyword) => async (dispatch) => {
  try {
    dispatch({
      type: SEARCHED_VIDEO_REQUEST,
    });

    const { data } = await request.get("/search", {
      params: {
        part: "snippet",
        maxResults: 20,
        q: keyword,
        type: "video,channel",
      },
    });
    dispatch({
      type: SEARCHED_VIDEO_SUCCESS,
      payload: data.items,
    });
  } catch (error) {
    console.log(error.message);

    dispatch({
      type: SEARCHED_VIDEO_FAIL,
      payload: error.message,
    });
  }
};

export const getSubscribedChannel = (id) => async (dispatch, getState) => {
  try {
    const { auth } = getState();
    if (!auth.accessToken) {
      throw new Error("Access token not found");
    }

    dispatch({
      type: SUBSCRIPTION_CHANNEL_REQUEST,
    });

    const { data } = await request.get("/subscriptions", {
      params: {
        part: "snippet,contentDetails",
        mine: true,
      },
      headers: {
        Authorization: `Bearer ${getState().auth.accessToken}`,
      },
    });

    dispatch({
      type: SUBSCRIPTION_CHANNEL_SUCCESS,
      payload: data.items,
    });
  } catch (error) {
    console.log(error.response.data.message);
    dispatch({
      type: SUBSCRIPTION_CHANNEL_FAIL,
      payload: error.response.data,
    });
  }
};

// export const getVideosByChannel = (id) => async (dispatch) => {
//   try {
//     dispatch({
//       type: CHANNEL_VIDEOS_REQUEST,
//     });

//     //1. get upload playlist id
//     const {
//       data: { items },
//     } = await request.get("/channels", {
//       params: {
//         part: "contentDetails",
//         id: id,
//       },
//     });

//     // if (!items || items.length === 0) {
//     //   throw new Error("No channels found with the provided ID");
//     // }

//     const uploadPlaylistId = items[0].contentDetails.relatedPlaylistId.uploads;

//     //2. get the values using the id
//     const { data } = await request.get("/playlistItems", {
//       params: {
//         part: "contentDetails,snippet",
//         playlistId: uploadPlaylistId,
//         maxResults: 30,
//       },
//     });

//     console.log(data.items);
//     dispatch({
//       type: CHANNEL_VIDEOS_SUCCESS,
//       payload: data.items,
//     });
//   } catch (error) {
//     console.log(error.response.data.message);
//     dispatch({
//       type: CHANNEL_VIDEOS_FAIL,
//       payload: error.response.data,
//     });
//   }
// };
