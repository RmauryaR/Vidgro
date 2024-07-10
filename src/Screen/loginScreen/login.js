// import React, { useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { Navigate, useNavigate } from "react-router-dom";
// import { login } from "../../redux/actions/auth.action";
// import "../loginScreen/_login.scss";

// const LoginScreen = () => {
//   const dispatch = useDispatch();

//   const accessToken = useSelector((state) => state.auth.accessToken);

//   const handleLogin = () => {
//     dispatch(login());
//   };

//   const history = useNavigate();

//   useEffect(() => {
//     if (accessToken) {
//       history.push("/");
//     }
//   }, [accessToken, history]);

//   return (
//     <div className="login">
//       <div className="login__container">
//         <h2>Youtube Clone</h2>
//         <img src="http://pngimg.com/uploads/youtube/youtube_PNG2.png" alt="" />
//         <button onClick={handleLogin}>Login With google</button>
//         <p>This Project is made using YOUTUBE DATA API</p>
//       </div>
//     </div>
//   );
// };

// export default LoginScreen;
//----------------------------------------------------------------------------------------------------------

import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../loginScreen/_login.scss";
import Youtubeimage from "../../images/ytimg-removebg-preview.jpg";
import { useDispatch, useSelector } from "react-redux";
import { sign_in } from "../../redux/actions/auth.action";
import { LOGIN_SUCCESS, LOAD_PROFILE } from "../../redux/actionType";

const LoginScreen = () => {
  const dispatch = useDispatch();

  const accessToken = useSelector((state) => state.auth.accessToken);
  const navigate = useNavigate();

  const handleLogin = () => {
    dispatch(sign_in());
  };

  useEffect(() => {
    const storedToken = sessionStorage.getItem("ytc-access-token");
    const storedUser = JSON.parse(sessionStorage.getItem("ytc-user"));

    // console.log("Retrieved accessToken:", storedToken);
    // console.log("Retrieved user:", storedUser);

    if (storedToken && storedUser) {
      dispatch({ type: LOGIN_SUCCESS, payload: storedToken });
      dispatch({ type: LOAD_PROFILE, payload: storedUser });
    }
    if (accessToken) {
      navigate("/");
    }
  }, [accessToken, navigate, dispatch]);
  return (
    <div className="login">
      <div className="login__Container">
        <img src={Youtubeimage} alt="" />
        <h3>Youtube Clone</h3>
        <button onClick={handleLogin}>Login with google</button>
        <p>
          This Youtube clone project made using youtube data API <br /> (This
          app does not collect your data) <br />
          ******
          <br />
          <a
            href="https://www.linkedin.com/in/rahulmaurya2812/"
            style={{ color: "#b1bdb4", textDecoration: "none" }}
          >
            RAHUL MAURYA
          </a>
        </p>
      </div>
    </div>
  );
};

export default LoginScreen;
