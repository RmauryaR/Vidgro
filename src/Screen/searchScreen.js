import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getVideosBySearch } from "../redux/actions/videos.action";
import { Container } from "react-bootstrap";
import VideoHorizontal from "../components/videoHorizontal/videoHorizontal";
// import Skeleton, { SkeletonTheme } from "react-loading-skeleton";

const SearchScreen = () => {
  const { query } = useParams();
  console.log(query);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getVideosBySearch(query));
  }, [query, dispatch]);

  const { videos, loading } = useSelector((state) => state.searchedVideos);
  console.log("Videos:", videos);
  return (
    <Container>
      {!loading ? (
        videos?.map((video) => (
          <VideoHorizontal video={video} key={video.id.videoId} searchScreen />
        ))
      ) : (
        <h1>Loading.....</h1>
        // <SkeletonTheme color="#343a40" highlightColor="#3c4147">
        //   <Skeleton width="100%" height="160px" count={20} />
        // </SkeletonTheme>
      )}
    </Container>
  );
};

export default SearchScreen;
