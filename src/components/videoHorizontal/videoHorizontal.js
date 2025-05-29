import React, { useEffect, useState } from "react";
import "./_videoHorizontal.scss";
import { AiFillEye } from "react-icons/ai";
import request from "../../api";
import moment from "moment";
import numeral from "numeral";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { Col, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";

const VideoHorizontal = ({ video, searchScreen, subScreen }) => {
  const {
    id,
    snippet: {
      channelId,
      channelTitle,
      description,
      title,
      publishedAt,
      thumbnails: { medium },
      resourceId,
    },
  } = video;

  const isVideo = !(id.kind === "youtube#channel" || subScreen);

  const [views, setViews] = useState(null);
  const [duration, setDuration] = useState(null);
  const [channelIcon, setChannelIcon] = useState(null);

  // Fetch video details
  useEffect(() => {
    const getVideoDetails = async () => {
      try {
        const {
          data: { items },
        } = await request("/videos", {
          params: {
            part: "contentDetails,statistics",
            id: id.videoId,
          },
        });
        setDuration(items[0]?.contentDetails?.duration);
        setViews(items[0]?.statistics?.viewCount);
      } catch (error) {
        console.error("Error fetching video details:", error);
      }
    };

    if (isVideo) getVideoDetails();
  }, [id, isVideo]);

  // Fetch channel icon
  useEffect(() => {
    const getChannelIcon = async () => {
      try {
        const {
          data: { items },
        } = await request("/channels", {
          params: {
            part: "snippet",
            id: channelId,
          },
        });
        setChannelIcon(items[0]?.snippet?.thumbnails?.default);
      } catch (error) {
        console.error("Error fetching channel icon:", error);
      }
    };

    if (channelId) getChannelIcon();
  }, [channelId]);

  // Format video duration
  const seconds = moment.duration(duration).asSeconds();
  const formattedDuration = moment.utc(seconds * 1000).format("mm:ss");

  const navigate = useNavigate();

  const _channelId = resourceId?.channelId || channelId;

  const handleClick = () => {
    isVideo
      ? navigate(`/watch/${id.videoId}`)
      : navigate(`/channel/${_channelId}`);
  };

  const thumbnailClass = !isVideo && "videoHorizontal__thumbnail-channel";

  return (
    <Row
      className="py-2 m-1 videoHorizontal align-items-center"
      onClick={handleClick}
    >
      <Col
        xs={6}
        md={searchScreen || subScreen ? 4 : 6}
        className="videoHorizontal__left"
      >
        <LazyLoadImage
          src={medium.url}
          effect="blur"
          className={`videoHorizontal__thumbnail ${thumbnailClass}`}
          wrapperClassName="videoHorizontal__thumbnail-wrapper"
        />
        {isVideo && (
          <span className="videoHorizontal__duration">{formattedDuration}</span>
        )}
      </Col>

      <Col
        xs={6}
        md={searchScreen || subScreen ? 8 : 6}
        className="p-0 videoHorizontal__right"
      >
        <p className="mb-1 videoHorizontal__title">{title}</p>

        {isVideo && (
          <div className="videoHorizontal__details">
            <AiFillEye /> {numeral(views).format("0.a")} Views •
            {moment(publishedAt).fromNow()}
          </div>
        )}

        {(searchScreen || subScreen) && (
          <p className="mt-1 videoHorizontal__desc">{description}</p>
        )}

        <div className="my-1 videoHorizontal__channel d-flex align-items-center">
          {isVideo && channelIcon && (
            <LazyLoadImage
              src={channelIcon?.url}
              effect="blur"
              className="rounded-circle mr-3"
            />
          )}
          <p className="mb-0">{channelTitle}</p>
        </div>

        {subScreen && (
          <p className="mt-2">{video.contentDetails.totalItemCount} Videos</p>
        )}
      </Col>
    </Row>
  );
};

VideoHorizontal.propTypes = {
  video: PropTypes.shape({
    id: PropTypes.shape({
      videoId: PropTypes.string,
      kind: PropTypes.string,
    }).isRequired,
    snippet: PropTypes.shape({
      channelId: PropTypes.string.isRequired,
      channelTitle: PropTypes.string.isRequired,
      description: PropTypes.string,
      title: PropTypes.string.isRequired,
      publishedAt: PropTypes.string.isRequired,
      thumbnails: PropTypes.shape({
        medium: PropTypes.shape({
          url: PropTypes.string.isRequired,
        }).isRequired,
      }).isRequired,
    }).isRequired,
  }).isRequired,
  searchScreen: PropTypes.bool,
  subScreen: PropTypes.bool,
};

export default VideoHorizontal;
