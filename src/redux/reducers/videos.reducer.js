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

export const HomeVideoReducer = (
  state = {
    videos: [],
    loading: false,
    nextPageToken: null,
    activeCategory: "All",
  },
  action
) => {
  const { type, payload } = action;
  console.log("Reducer action type:", type);
  console.log("Reducer action payload:", payload);

  switch (action.type) {
    case HOME_VIDEOS_SUCCESS:
      console.log("Updating videos with payload:", payload);
      return {
        ...state,
        videos:
          state.activeCategory === payload.category
            ? [...state.videos, ...payload.videos]
            : payload.videos,

        loading: false,
        nextPageToken: action.payload.nextPageToken,
        activeCategory: payload.category,
      };
    case HOME_VIDEOS_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case HOME_VIDEOS_REQUEST:
      return {
        ...state,
        loading: true,
      };

    default:
      return state;
  }
};

export const selectedVideoReducer = (
  state = {
    loading: true,
    video: null,
  },
  action
) => {
  const { payload, type } = action;
  switch (type) {
    case SELECTED_VIDEOS_REQUEST:
      return {
        ...state,
        loading: true,
      };

    case SELECTED_VIDEOS_SUCCESS:
      return {
        ...state,
        video: payload,
        loading: false,
      };
    case SELECTED_VIDEOS_FAIL:
      return {
        ...state,
        video: null,
        loading: false,
        error: payload,
      };
    default:
      return state;
  }
};

// export const relatedVideoReducer = (
//   state = {
//     relatedVideoloading: false,
//     videos: [],
//   },
//   action
// ) => {
//   const { payload, type } = action;
//   switch (type) {
//     case RELATED_VIDEO_REQUEST:
//       return {
//         ...state,
//         relatedVideoloading: true,
//       };

//     case RELATED_VIDEO_SUCCESS:
//       return {
//         ...state,
//         videos: payload,
//         relatedVideoloading: false,
//       };
//     case RELATED_VIDEO_FAIL:
//       return {
//         ...state,
//         relatedVideoloading: false,
//         error: payload,
//       };
//     default:
//       return state;
//   }
// };
// const initialState = {
//   videos: [],
//   loading: false,
//   error: null,
// };
// videos.reducer.js

const initialState = {
  videos: [],
  loading: false,
};

export const relatedVideoReducer = (state = initialState, action) => {
  switch (action.type) {
    case RELATED_VIDEO_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case RELATED_VIDEO_SUCCESS:
      return {
        ...state,
        videos: action.payload,
        loading: false,
      };
    case RELATED_VIDEO_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export const searchedVideosReducer = (state = initialState, action) => {
  const { payload, type } = action;
  switch (type) {
    case SEARCHED_VIDEO_REQUEST:
      return {
        ...state,
        loading: true,
      };

    case SEARCHED_VIDEO_SUCCESS:
      return {
        ...state,
        videos: payload,
        loading: false,
      };
    case SEARCHED_VIDEO_FAIL:
      return {
        ...state,
        loading: false,
        error: payload,
      };
    default:
      return state;
  }
};

export const subscriptionsChannelReducer = (state = initialState, action) => {
  const { payload, type } = action;
  switch (type) {
    case SUBSCRIPTION_CHANNEL_REQUEST:
      return {
        ...state,
        loading: true,
      };

    case SUBSCRIPTION_CHANNEL_SUCCESS:
      return {
        ...state,
        videos: payload,
        loading: false,
      };
    case SUBSCRIPTION_CHANNEL_FAIL:
      return {
        ...state,
        loading: false,
        error: payload,
      };
    default:
      return state;
  }
};

// export const channelVideosReducer = (state = initialState, action) => {
//   switch (action.type) {
//     case CHANNEL_VIDEOS_REQUEST:
//       return {
//         ...state,
//         loading: true,
//       };
//     case CHANNEL_VIDEOS_SUCCESS:
//       return {
//         ...state,
//         loading: false,
//         videos: action.payload,
//       };
//     case CHANNEL_VIDEOS_FAIL:
//       return {
//         ...state,
//         loading: false,
//         error: action.payload,
//       };
//     default:
//       return state;
//   }
// };
