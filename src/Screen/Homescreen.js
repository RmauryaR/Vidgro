import React, { useEffect } from "react";
import { Container, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import InfiniteScroll from "react-infinite-scroll-component";
import VID from "../components/video/video";
import Categories from "../components/Categoriesbar/Categories";
import SkeletonVideo from "../components/skeletons/SkeletonVideo";
import {
  getPopularVideos,
  getVideosByCategory,
} from "../redux/actions/videos.action";

const Homescreen = () => {
  const dispatch = useDispatch();

  const {
    videos = [],
    activeCategory,
    loading,
  } = useSelector((state) => state.homeVideos);

  useEffect(() => {
    dispatch(getPopularVideos());
  }, [dispatch]);

  const fetchData = () => {
    if (activeCategory === "All") {
      dispatch(getPopularVideos());
    } else {
      dispatch(getVideosByCategory(activeCategory));
    }
  };

  return (
    <Container>
      <Categories />
      <InfiniteScroll
        dataLength={videos.length}
        next={fetchData}
        hasMore={true}
        loader={<div className="spinner-border text-danger d-block mx-auto" />}
        className="row"
      >
        {loading && videos.length === 0
          ? [...Array(20)].map((_, index) => (
              <Col lg={3} md={4} key={index}>
                <SkeletonVideo />
              </Col>
            ))
          : videos.map((video) => (
              <Col lg={3} md={4} key={video.id?.videoId || video.id}>
                <VID video={video} />
              </Col>
            ))}
      </InfiniteScroll>
    </Container>
  );
};

export default Homescreen;
