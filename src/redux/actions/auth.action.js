import { auth } from "../../firebase";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import {
  LOAD_PROFILE,
  LOGIN_FAIL,
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOG_OUT,
} from "../actionType";

const provider = new GoogleAuthProvider();
provider.addScope("https://www.googleapis.com/auth/youtube.force-ssl");
export const sign_in = () => async (dispatch) => {
  try {
    dispatch({
      type: LOGIN_REQUEST,
    });

    const res = await signInWithPopup(auth, provider);
    // console.log(res);
    const credential = GoogleAuthProvider.credentialFromResult(res);
    const token = credential.accessToken;

    const profile = {
      name: res.user.displayName,
      photoURL: res.user.photoURL,
      email: res.user.email,
      phoneNumber: res.user.phoneNumber,
    };

    sessionStorage.setItem("ytc-access-token", token);
    sessionStorage.setItem("ytc-user", JSON.stringify(profile));
    // console.log("Stored accessToken:", token);
    // console.log("Stored profile:", profile);

    dispatch({
      type: LOGIN_SUCCESS,
      payload: token,
    });
    dispatch({
      type: LOAD_PROFILE,
      payload: profile,
    });
    // Dispatch the login success action or handle the response
  } catch (error) {
    console.log(error.message);
    dispatch({
      type: LOGIN_FAIL,
      payload: error.message,
    });
    // Handle the error (e.g., dispatch a login failure action)
  }
};

export const log_out = () => async (dispatch) => {
  await auth.signOut();
  dispatch({
    type: LOG_OUT,
  });

  sessionStorage.removeItem("ytc-access-token");
  sessionStorage.removeItem("ytc-user");
};
