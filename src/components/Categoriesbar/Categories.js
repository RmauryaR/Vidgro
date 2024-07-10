import React, { useState } from "react";
import "../../components/Categoriesbar/_Categories.scss";
import "../Categoriesbar/_Categories.scss";
import { useDispatch } from "react-redux";
import {
  getPopularVideos,
  getVideosByCategory,
} from "../../redux/actions/videos.action";
const keywords = [
  "All",
  "React js",
  "Angular Js",
  "React Native",
  "Punjabi songs",
  "Use of API",
  "Redux",
  "Music",
  "python",
  "Algorithms Art",
  "Guitar",
  "Bengali Song",
  "Cricket",
  "C programming",
  "C++",
  "Football",
  "Real Madrid",
  "Gatsby",
  "Poor Coder",
  "Shwetabh",
  "Hindi Songs",
  "Bhojpuri Songs",
];
const Categories = () => {
  const [activeElement, setActiveElement] = useState("All");

  const dispatch = useDispatch();
  const handleClick = (value) => {
    setActiveElement(value);
    if (value === "All") {
      dispatch(getPopularVideos());
    } else {
      dispatch(getVideosByCategory(value));
    }
  };

  return (
    <div className="categoriesbar">
      {keywords.map((value, i) => (
        <span
          onClick={() => handleClick(value)}
          key={i}
          className={activeElement === value ? "active" : ""}
        >
          {value}
        </span>
      ))}{" "}
    </div>
  );
};

export default Categories;
