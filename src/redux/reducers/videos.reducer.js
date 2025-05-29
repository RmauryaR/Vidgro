import {
  HOME_VIDEOS_REQUEST,
  HOME_VIDEOS_SUCCESS,
  HOME_VIDEOS_FAIL,
  SELECTED_VIDEOS_REQUEST,
  SELECTED_VIDEOS_SUCCESS,
  SELECTED_VIDEOS_FAIL,
  RELATED_VIDEO_REQUEST,
  RELATED_VIDEO_SUCCESS,
  RELATED_VIDEO_FAIL,
  SEARCHED_VIDEO_REQUEST,
  SEARCHED_VIDEO_SUCCESS,
  SEARCHED_VIDEO_FAIL,
  SUBSCRIPTION_CHANNEL_REQUEST,
  SUBSCRIPTION_CHANNEL_SUCCESS,
  SUBSCRIPTION_CHANNEL_FAIL,
} from "../actionType";

// Initial state for Home videos
const initialHomeVideoState = {
  videos: [], // ✅ important fix
  nextPageToken: null,
  activeCategory: "All",
  loading: false,
  error: null,
};

export const HomeVideoReducer = (state = initialHomeVideoState, action) => {
  const { type, payload } = action;

  switch (type) {
    case HOME_VIDEOS_REQUEST:
      return { ...state, loading: true };
    case HOME_VIDEOS_SUCCESS:
      return {
        ...state,
        videos:
          state.activeCategory === payload.category
            ? [...state.videos, ...payload.videos]
            : payload.videos,
        nextPageToken: payload.nextPageToken,
        activeCategory: payload.category,
        loading: false,
      };
    case HOME_VIDEOS_FAIL:
      return { ...state, loading: false, error: payload };
    default:
      return state;
  }
};

// Reuse for other reducers
const initialState = {
  video: {},
  loading: false,
  error: null,
};

// Selected video
export const selectedVideoReducer = (state = initialState, action) => {
  switch (action.type) {
    case SELECTED_VIDEOS_REQUEST:
      return { ...state, loading: true };
    case SELECTED_VIDEOS_SUCCESS:
      return { ...state, loading: false, video: action.payload || {} };
    case SELECTED_VIDEOS_FAIL:
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

export const relatedVideoReducer = (
  state = { videos: [], loading: false },
  action
) => {
  const { type, payload } = action;

  switch (type) {
    case RELATED_VIDEO_REQUEST:
      return { ...state, loading: true };
    case RELATED_VIDEO_SUCCESS:
      return { ...state, videos: payload || [], loading: false };
    case RELATED_VIDEO_FAIL:
      return { ...state, loading: false, error: payload };
    default:
      return state;
  }
};

export const searchedVideosReducer = (
  state = { videos: [], loading: false },
  action
) => {
  const { type, payload } = action;

  switch (type) {
    case SEARCHED_VIDEO_REQUEST:
      return { ...state, loading: true };
    case SEARCHED_VIDEO_SUCCESS:
      return { ...state, videos: payload || [], loading: false };
    case SEARCHED_VIDEO_FAIL:
      return { ...state, loading: false, error: payload };
    default:
      return state;
  }
};

export const subscriptionsChannelReducer = (
  state = { videos: [], loading: false },
  action
) => {
  const { type, payload } = action;

  switch (type) {
    case SUBSCRIPTION_CHANNEL_REQUEST:
      return { ...state, loading: true };
    case SUBSCRIPTION_CHANNEL_SUCCESS:
      return { ...state, videos: payload || [], loading: false };
    case SUBSCRIPTION_CHANNEL_FAIL:
      return { ...state, loading: false, error: payload };
    default:
      return state;
  }
};
