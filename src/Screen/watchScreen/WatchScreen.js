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

  const {
    videos: relatedVideos = [],
    loading: relatedVideoLoading = false,
    error: relatedVideoError = null,
  } = useSelector((state) => state.relatedVideo || {});

  const selectedVideoState = useSelector((state) => state.selectedVideo) || {};

  const {
    video = {},
    loading = false,
    commentsLoading = false,
    error: videoError = null,
  } = selectedVideoState;

  // Debug log to confirm video data shape
  console.log("Selected Video State:", selectedVideoState);

  return (
    <Row>
      <Col lg={8}>
        <div className="watchScreen_player">
          <iframe
            src={`https://www.youtube.com/embed/${id}`}
            frameBorder="0"
            title={video?.snippet?.title || "YouTube Video"}
            allowFullScreen
            width="100%"
            height="100%"
          ></iframe>
        </div>

        {/* ✅ Only render when video.snippet and statistics are available */}
        {!loading && video?.snippet && video?.statistics ? (
          <VideoMetaData video={video} videoId={id} />
        ) : (
          <h6>Loading video metadata...</h6>
        )}

        {/* ✅ Render Comments only when commentCount is present */}
        {commentsLoading ? (
          <h6>Loading comments...</h6>
        ) : video?.statistics?.commentCount !== undefined ? (
          <Comments
            videoId={id}
            totalComments={video.statistics.commentCount}
          />
        ) : (
          <h6>Comments not available</h6>
        )}

        {videoError && <h6>{videoError}</h6>}
      </Col>

      <Col lg={4}>
        {relatedVideoLoading ? (
          <h6>Loading related videos...</h6>
        ) : relatedVideoError ? (
          <h6>{relatedVideoError}</h6>
        ) : relatedVideos?.length > 0 ? (
          relatedVideos
            .filter((video) => video.snippet)
            .map((video) => (
              <VideoHorizontal
                video={video}
                key={video.id?.videoId || video.id}
              />
            ))
        ) : (
          <h6>No related videos found.</h6>
        )}
      </Col>
    </Row>
  );
};

export default WatchScreen;
