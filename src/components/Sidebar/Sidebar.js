import React from "react";
import {
  MdSubscriptions,
  MdExitToApp,
  MdThumbUp,
  MdHistory,
  MdLibraryBooks,
  MdHome,
  MdSentimentDissatisfied,
} from "react-icons/md";
import "../Sidebar/_Sidebar.scss";
import { useDispatch } from "react-redux";
import { log_out } from "../../redux/actions/auth.action";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

import { getPopularVideos } from "../../redux/actions/videos.action";
const Sidebar = ({ sidebar, handleToggleSidebar }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const logoutHandler = () => {
    dispatch(log_out());
  };
  const goHome = () => {
    console.log("Home clicked");
    dispatch(getPopularVideos());
    navigate("/");
  };

  return (
    <nav
      className={sidebar ? "sidebar open" : "sidebar"}
      onClick={() => handleToggleSidebar(false)}
    >
      <Link to="/feed/">
        <li onClick={goHome}>
          <MdHome size={23} />
          <span>Home</span>
        </li>
      </Link>
      <Link to="/feed/subscriptions">
        <li>
          <MdSubscriptions size={23} />
          <span>Subscription</span>
        </li>
      </Link>
      <Link to="/feed/">
        <li>
          <MdThumbUp size={23} />
          <span>Liked Videos</span>
        </li>
      </Link>

      <Link to="/feed/">
        <li>
          <MdHistory size={23} />
          <span>History</span>
        </li>
      </Link>

      <Link to="/feed/">
        <li>
          <MdLibraryBooks size={23} />
          <span>Library</span>
        </li>
      </Link>

      <li>
        <MdSentimentDissatisfied size={23} />
        <span>I don't know</span>
      </li>
      <hr />
      <li onClick={logoutHandler}>
        <MdExitToApp size={23} />
        <span>Log Out</span>
      </li>
      <hr />
      <li>
        <span>
          <a
            href="https://www.linkedin.com/in/rahulmaurya2812/"
            target="blank"
            style={{ color: "#b1bdb4", textDecoration: "none" }}
          >
            Rahul__Maurya
          </a>
        </span>
      </li>
      <hr />
    </nav>
  );
};

export default Sidebar;
