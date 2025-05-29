import React, { useState } from "react";
import "../Header/Header";
import "../Header/_Header.scss";
import { FaBars } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import YoutubeImage from "../../images/ytimg-removebg-preview.jpg";
import Avtar from "../../images/stylish-spectacles-guy-3d-avatar-character-illustrations-png.png";
import { AiOutlineSearch } from "react-icons/ai";
import { MdNotifications, MdApps } from "react-icons/md";
import { useSelector } from "react-redux";
const Header = ({ handleToggleSidebar }) => {
  const [input, setInput] = useState("");

  const navigate = useNavigate();
  const handleSubmit = (e) => {
    e.preventDefault();
    navigate(`/search/${input}`);
  };

  const user = useSelector((state) => state.auth?.user);
  const photoURL =
    user?.photoURL ||
    "https://static.vecteezy.com/system/resources/thumbnails/027/951/137/small_2x/stylish-spectacles-guy-3d-avatar-character-illustrations-png.png"; // Provide a default avatar image path

  return (
    <div className="header">
      <FaBars
        className="header__menu"
        size={26}
        onClick={() => handleToggleSidebar()}
      />
      <img src={YoutubeImage} alt="" className="header__logo" />
      {/* <h4>VIDGROW</h4> */}
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="search"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <button type="submit">
          <AiOutlineSearch size={22} className="search_icon" />
        </button>
      </form>
      <div className="header__icons">
        <MdNotifications size={28} />
        <MdApps size={28} />
        <img src={photoURL} alt="avtar" />
      </div>
    </div>
  );
};

export default Header;
