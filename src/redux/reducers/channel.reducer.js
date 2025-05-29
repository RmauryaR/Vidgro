import {
  CHANNEL_DETAILS_FAIL,
  CHANNEL_DETAILS_REQUEST,
  CHANNEL_DETAILS_SUCCESS,
  SET_SUBSCRIPTION_STATUS,
} from "../actionType";

// Initial state for channel details
const initialState = {
  loading: true,
  channel: {}, // Default to empty object for channel
  subscriptionStatus: false, // Default subscription status to false
  error: null, // Optional: add error to manage errors if needed
};

export const channelDetailsReducer = (state = initialState, action) => {
  const { payload, type } = action;
  switch (type) {
    case CHANNEL_DETAILS_REQUEST:
      return {
        ...state,
        loading: true,
      };

    case CHANNEL_DETAILS_SUCCESS:
      return {
        ...state,
        channel: payload || {}, // Ensure payload is a valid object or fallback to empty object
        loading: false,
      };

    case CHANNEL_DETAILS_FAIL:
      return {
        ...state,
        channel: {}, // Reset channel to empty object on failure
        loading: false,
        error: payload, // Save error in state to display in UI
      };

    case SET_SUBSCRIPTION_STATUS:
      return {
        ...state,
        subscriptionStatus: payload || false, // Default to false if payload is undefined or null
      };

    default:
      return state;
  }
};
