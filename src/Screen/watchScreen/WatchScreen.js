import React, { useEffect } from "react";
import "./WatchScreen.scss";
import { Col, Row } from "react-bootstrap";
import VideoHorizontal from "../../components/videoHorizontal/videoHorizontal";
import VideoMetaData from "../../components/videoMetaData/videoMetaData";
import Comments from "../../components/comments/comment";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  getRelatedVideos,
  getVideoById,
} from "../../redux/actions/videos.action";
const WatchScreen = () => {
  const { id } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getVideoById(id));
    dispatch(getRelatedVideos(id));
  }, [dispatch, id]);

  // const { videos: relatedVideos, loading: relatedVideoLoading } = useSelector(
  //   (state) => state.relatedVideo
  // );
  const { videos: relatedVideos = [], loading: relatedVideoLoading = false } =
    useSelector((state) => state.relatedVideo || {});

  const { video, loading, commentsLoading } = useSelector(
    (state) => state.selectedVideo
  );

  return (
    <Row>
      <Col Lg={8}>
        <div className="watchScreen_player">
          <iframe
            src={`https://www.youtube.com/embed/${id}`}
            frameBorder="0"
            title={video?.snippet?.title}
            allowFullScreen
            width="100%"
            height="100%"
          ></iframe>
        </div>
        {!loading ? (
          <VideoMetaData video={video} videoId={id} />
        ) : (
          <h6>Loading....</h6>
        )}
        {/* <Comments videoId={id} /> */}
        {commentsLoading ? (
          <h6>Loading comments...</h6>
        ) : (
          <Comments
            videoId={id}
            totalComments={video?.Statistics?.commentCount}
          />
        )}
      </Col>

      {/* <Col Lg={4}>
        {[...Array(10)].map((_, index) => (
          <VideoHorizontal key={index} />
        ))}
      </Col> */}

      <Col lg={4}>
        {!relatedVideoLoading && relatedVideos && relatedVideos.length > 0 ? (
          relatedVideos
            .filter((video) => video.snippet)
            .map((video) => (
              <VideoHorizontal video={video} key={video.id.videoId} />
            ))
        ) : (
          <h6>Loading related videos...</h6>
        )}
      </Col>
    </Row>
  );
};

export default WatchScreen;
