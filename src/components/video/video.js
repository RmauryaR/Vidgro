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
  const [channelIcon, setchannelIcon] = useState(null);

  const _videoId = id?.videoId || id;
  const navigate = useNavigate();
  useEffect(() => {
    const get_video_details = async () => {
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
    get_video_details();
  }, [_videoId]);

  useEffect(() => {
    const get_channel_icon = async () => {
      const {
        data: { items },
      } = await request("/channels", {
        params: {
          part: "snippet",
          id: channelId,
        },
      });
      setchannelIcon(items[0].snippet.thumbnails.default);
    };
    get_channel_icon();
  }, [channelId]);

  // const seconds = moment.duration(duration).asSecond();

  const parseDuration = (duration) => {
    if (!duration) {
      return 0; // or any default value if duration is null or undefined
    }
    const match = duration.match(/PT(\d+H)?(\d+M)?(\d+S)?/);
    if (!match) {
      return 0; // handle cases where duration format doesn't match
    }
    const hours = parseInt(match[1], 10) || 0;
    const minutes = parseInt(match[2], 10) || 0;
    const seconds = parseInt(match[3], 10) || 0;
    return moment.duration({ hours, minutes, seconds }).asSeconds();
  };

  const seconds = duration ? parseDuration(duration) : 0;
  const _duration = moment.utc(seconds * 1000).format("mm:ss");

  const handleVideoClick = () => {
    navigate(`/watch/${_videoId}`);
  };
  return (
    <div className="video" onClick={handleVideoClick}>
      <div className="video__top">
        {/* <img src={medium.url} alt="" /> */}
        <LazyLoadImage src={medium.url} effect="blur" />
        <span className="video__top__duration">{_duration}</span>
      </div>
      <div className="video__title">{title}</div>
      <div className="video__details">
        <span>
          <AiFillEye />
          {numeral(views).format("0.a")} views •
        </span>
        <span> {moment(publishedAt).fromNow()}</span>
      </div>
      {channelScreen && (
        <div className="video__channel">
          {/* <img src={channelIcon?.url} alt="" /> */}
          <LazyLoadImage src={channelIcon?.url} effect="blur" />
          <p>{channelTitle}</p>
        </div>
      )}
    </div>
  );
};

export default VID;
