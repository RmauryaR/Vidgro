import {
  LOAD_PROFILE,
  LOGIN_FAIL,
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOG_OUT,
} from "../actionType";

// Initialize state from sessionStorage if available
const initialState = {
  accessToken: sessionStorage.getItem("ytc-access-token")
    ? sessionStorage.getItem("ytc-access-token")
    : null,
  user: sessionStorage.getItem("ytc-user")
    ? JSON.parse(sessionStorage.getItem("ytc-user"))
    : null,
  loading: false,
  error: null, // Added to handle errors when login fails
};

export const authReducer = (prevState = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case LOGIN_REQUEST:
      return {
        ...prevState,
        loading: true,
        error: null, // Reset error when a new login request starts
      };

    case LOGIN_SUCCESS:
      // On success, store the token and reset the loading state
      return {
        ...prevState,
        accessToken: payload.accessToken, // Assuming payload contains the accessToken object
        user: payload.user || prevState.user, // Use the payload user or retain the current user state
        loading: false,
        error: null,
      };

    case LOGIN_FAIL:
      // On login failure, reset the access token and store the error message
      return {
        ...prevState,
        accessToken: null,
        loading: false,
        error: payload, // Assuming payload contains the error message
      };

    case LOAD_PROFILE:
      return {
        ...prevState,
        user: payload, // Update the user profile information
      };

    case LOG_OUT:
      // When the user logs out, reset all auth-related data
      return {
        ...prevState,
        accessToken: null,
        user: null,
        error: null, // Clear any previous errors
      };

    default:
      // Return the previous state if no matching action is found
      return prevState;
  }
};
