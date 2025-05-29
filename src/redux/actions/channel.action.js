import request from "../../api";
import {
  CHANNEL_DETAILS_FAIL,
  CHANNEL_DETAILS_REQUEST,
  CHANNEL_DETAILS_SUCCESS,
  SET_SUBSCRIPTION_STATUS,
} from "../actionType";

// Get Channel Details
export const getChannelDetails = (id) => async (dispatch) => {
  try {
    dispatch({
      type: CHANNEL_DETAILS_REQUEST,
    });

    const { data } = await request.get("/channels", {
      params: {
        part: "snippet,statistics,contentDetails",
        id,
      },
    });

    // Ensure data and items are valid
    if (data?.items?.length > 0) {
      dispatch({
        type: CHANNEL_DETAILS_SUCCESS,
        payload: data.items[0],
      });
    } else {
      throw new Error("No channel data returned");
    }
  } catch (error) {
    console.error("Channel Details Error:", error.message);
    dispatch({
      type: CHANNEL_DETAILS_FAIL,
      payload:
        error.response?.data?.message || error.message || "Unknown error",
    });
  }
};

// Check Subscription Status
export const checkSubscriptionStatus = (id) => async (dispatch, getState) => {
  try {
    const { auth } = getState();
    if (!auth.accessToken) {
      throw new Error("Access token not found");
    }

    const { data } = await request.get("/subscriptions", {
      params: {
        part: "snippet",
        forChannelId: id,
        mine: true,
      },
      headers: {
        Authorization: `Bearer ${auth.accessToken}`,
      },
    });

    dispatch({
      type: SET_SUBSCRIPTION_STATUS,
      payload: data?.items?.length !== 0,
    });

    console.log("Subscription check response:", data);
  } catch (error) {
    console.error(
      "Subscription Status Error:",
      error.response?.data?.message || error.message || "Unknown error"
    );
  }
};
