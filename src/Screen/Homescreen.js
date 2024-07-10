import React, { useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Container, Row, Col } from "react-bootstrap";
import VID from "../components/video/video";
import Categories from "../components/Categoriesbar/Categories";
import { useDispatch, useSelector } from "react-redux";
import {
  getPopularVideos,
  getVideosByCategory,
} from "../redux/actions/videos.action";
import InfiniteScroll from "react-infinite-scroll-component";
import SkeletonVideo from "../components/skeletons/SkeletonVideo";

const Homescreen = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getPopularVideos());
  }, [dispatch]);

  const { videos, activeCategory, loading } = useSelector(
    (state) => state.homeVideos
  );

  useEffect(() => {
    console.log("Loading state:", loading);
  }, [loading]);

  const fetchData = () => {
    if (activeCategory === "All") {
      dispatch(getPopularVideos());
    } else {
      dispatch(getVideosByCategory(activeCategory));
    }
  };

  return (
    <>
      <Container>
        <Categories />
        {/* <Row> */}
        <InfiniteScroll
          dataLength={videos.length}
          next={fetchData}
          hasMore={true}
          Loader={
            <div className="spinner-border text-danger d-block mx-auto"></div>
          }
          className="row"
        >
          {loading
            ? [...Array(21)].map((_, index) => (
                <Col Lg={3} md={4} key={index}>
                  <SkeletonVideo />
                </Col>
              ))
            : videos.map((video) => (
                <Col Lg={3} md={4}>
                  <VID video={video} key={video.id} />
                </Col>
              ))}
        </InfiniteScroll>
        {/* </Row> */}
      </Container>
    </>
  );
};

export default Homescreen;
