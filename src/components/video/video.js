import React, { useEffect, useState } from "react";
import "../video/_video.scss";
import { AiFillEye } from "react-icons/ai";
import { LazyLoadImage } from "react-lazy-load-image-component";
import request from "../../api";
import moment from "moment";
import numeral from "numeral";
import { useNavigate } from "react-router-dom";

const VID = ({ video, channelScreen }) => {
  const {
    id,
    snippet: {
      channelId,
      channelTitle,
      title,
      publishedAt,
      thumbnails: { medium },
    },
  } = video;

  const [views, setViews] = useState(null);
  const [duration, setDuration] = useState(null);
  const [channelIcon, setChannelIcon] = useState(null);

  const _videoId = id?.videoId || id;
  const navigate = useNavigate();

  useEffect(() => {
    const getVideoDetails = async () => {
      try {
        const {
          data: { items },
        } = await request("/videos", {
          params: {
            part: "contentDetails,statistics",
            id: _videoId,
          },
        });

        if (items && items.length > 0) {
          setDuration(items[0].contentDetails.duration);
          setViews(items[0].statistics.viewCount);
        }
      } catch (error) {
        console.error("Error fetching video details:", error);
      }
    };

    getVideoDetails();
  }, [_videoId]);

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

        if (items && items.length > 0) {
          setChannelIcon(items[0].snippet.thumbnails.default);
        }
      } catch (error) {
        console.error("Error fetching channel details:", error);
      }
    };

    getChannelIcon();
  }, [channelId]);

  const parseDuration = (duration) => {
    if (!duration) return 0;
    const match = duration.match(/PT(\d+H)?(\d+M)?(\d+S)?/);
    if (!match) return 0;
    const hours = parseInt(match[1], 10) || 0;
    const minutes = parseInt(match[2], 10) || 0;
    const seconds = parseInt(match[3], 10) || 0;
    return moment.duration({ hours, minutes, seconds }).asSeconds();
  };

  const seconds = duration ? parseDuration(duration) : 0;
  const formattedDuration = moment.utc(seconds * 1000).format("mm:ss");

  const handleVideoClick = () => {
    navigate(`/watch/${_videoId}`);
  };

  return (
    <div className="video" onClick={handleVideoClick}>
      <div className="video__top">
        <LazyLoadImage src={medium.url} effect="blur" />
        <span className="video__top__duration">{formattedDuration}</span>
      </div>
      <div className="video__title">{title}</div>
      <div className="video__details">
        <span>
          <AiFillEye />
          {views ? numeral(views).format("0.a") : "0"} views •
        </span>
        <span>{moment(publishedAt).fromNow()}</span>
      </div>
      <div className="video__channel">
        <LazyLoadImage src={channelIcon?.url} effect="blur" />
        <p>{channelTitle}</p>
      </div>
    </div>
  );
};

export default VID;
