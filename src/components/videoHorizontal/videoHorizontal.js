import React, { useEffect, useState } from "react";
import "./_videoHorizontal.scss";

import { AiFillEye } from "react-icons/ai";
import request from "../../api";

import moment from "moment";
import numeral from "numeral";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { Col, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

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

  useEffect(() => {
    const get_video_details = async () => {
      const {
        data: { items },
      } = await request("/videos", {
        params: {
          part: "contentDetails,statistics",
          id: id.videoId,
        },
      });
      setDuration(items[0].contentDetails.duration);
      setViews(items[0].statistics.viewCount);
    };
    if (isVideo) get_video_details();
  }, [id, isVideo]);

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
      setChannelIcon(items[0].snippet.thumbnails.default);
    };
    get_channel_icon();
  }, [channelId]);

  const seconds = moment.duration(duration).asSeconds();
  const _duration = moment.utc(seconds * 1000).format("mm:ss");

  const history = useNavigate();

  const _channelId = resourceId?.channelId || channelId;

  const handleClick = () => {
    isVideo
      ? history(`/watch/${id.videoId}`)
      : history(`/channel/${_channelId}`);
  };

  const thumbnail = !isVideo && "videoHorizontal__thumbnail-channel";

  return (
    <Row
      className="py-2 m-1 videoHorizontal align-items-center"
      onClick={handleClick}
    >
      {/* //TODO refractor grid */}
      <Col
        xs={6}
        md={searchScreen || subScreen ? 4 : 6}
        className="videoHorizontal__left"
      >
        <LazyLoadImage
          src={medium.url}
          effect="blur"
          className={`videoHorizontal__thumbnail ${thumbnail} `}
          wrapperClassName="videoHorizontal__thumbnail-wrapper"
        />
        {isVideo && (
          <span className="videoHorizontal__duration">{_duration}</span>
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
          {isVideo && <LazyLoadImage src={channelIcon?.url} effect="blur" />}
          <p className="mb-0">{channelTitle}</p>
        </div>
        {subScreen && (
          <p className="mt-2">{video.contentDetails.totalItemCount} Videos</p>
        )}
      </Col>
    </Row>
  );
};

export default VideoHorizontal;

//----------------------------------------------------------------------------------------------------------------------
// import React, { useState, useEffect } from "react";
// import PropTypes from "prop-types";
// import "./_videoHorizontal.scss";
// import { AiFillEye } from "react-icons/ai";
// import { LazyLoadImage } from "react-lazy-load-image-component";
// import moment from "moment";
// import numeral from "numeral";
// import { Col, Row } from "react-bootstrap";
// import request from "../../api";
// import { useNavigate } from "react-router-dom";

// const VideoHorizontal = ({ video, searchScreen, subScreen }) => {
//   const [views, setViews] = useState(null);
//   const [duration, setDuration] = useState(null);
//   const [channelIcon, setChannelIcon] = useState(null);

//   // Ensure hooks are called regardless of video prop validity
//   useEffect(() => {
//     if (!video || !video.snippet || !video.id) {
//       console.error("Invalid video prop:", video);
//       return; // Early return but after hooks are called
//     }

//     // If video.id is an object containing videoId, we need to access it properly
//     const videoId = video.id.videoId || video.id; // Use video.id.videoId if it exists, else fallback to video.id

//     const getVideoDetails = async () => {
//       try {
//         const {
//           data: { items },
//         } = await request("/videos", {
//           params: {
//             part: "contentDetails,statistics",
//             id: videoId,
//           },
//         });
//         setDuration(items[0].contentDetails.duration);
//         setViews(items[0].statistics.viewCount);
//       } catch (error) {
//         console.error("Error fetching video details:", error);
//       }
//     };
//     getVideoDetails();

//     const getChannelIcon = async () => {
//       try {
//         const {
//           data: { items },
//         } = await request("/channels", {
//           params: {
//             part: "snippet",
//             id: video.snippet.channelId,
//           },
//         });
//         setChannelIcon(items[0].snippet.thumbnails.default);
//       } catch (error) {
//         console.error("Error fetching channel icon:", error);
//       }
//     };
//     getChannelIcon();
//   }, [video]);

//   const parseDuration = (duration) => {
//     if (!duration) {
//       return 0; // or any default value if duration is null or undefined
//     }
//     const match = duration.match(/PT(\d+H)?(\d+M)?(\d+S)?/);
//     if (!match) {
//       return 0; // handle cases where duration format doesn't match
//     }

//     const hours = parseInt(match[1], 10) || 0;
//     const minutes = parseInt(match[2], 10) || 0;
//     const seconds = parseInt(match[3], 10) || 0;
//     return moment.duration({ hours, minutes, seconds }).asSeconds();
//   };

//   const seconds = duration ? parseDuration(duration) : 0;
//   const _duration = moment.utc(seconds * 1000).format("mm:ss");

//   const _resourceId = video.snippet.resourceId;
//   const _channelId = _resourceId?.channelId || video.id.channelId;

//   const navigate = useNavigate();
//   const handleClick = () => {
//     isVideo
//       ? navigate(`/watch/${video.id.videoId}`)
//       : navigate(`/channel/${_channelId}`);
//   };

//   // Early return after hooks
//   if (!video || !video.snippet || !video.id) {
//     return null; // Or a fallback UI
//   }
//   const isVideo = !(video.id.kind === "youtube#channel" || subScreen);
//   const thumbnail = !isVideo && `videoHorizontal__thumbnail-channel`;

//   return (
//     <Row
//       className="videoHorizontal m-1 py-2 align-items-center"
//       onClick={handleClick}
//     >
//       <Col
//         xs={6}
//         md={searchScreen || subScreen ? 4 : 6}
//         className="videoHorizontal__left"
//       >
//         <LazyLoadImage
//           src={video.snippet.thumbnails.medium.url}
//           effect="blur"
//           className={`videoHorizontal__thumbnail ${thumbnail}`}
//           wrapperClassName="videoHorizontal__thumbnail-wrapper"
//         />

//         {isVideo && <span className="video__top__duration">{_duration}</span>}
//       </Col>
//       <Col
//         xs={6}
//         md={searchScreen || subScreen ? 8 : 6}
//         className="videoHorizontal__right p-0"
//       >
//         <p className="videoHorizontal__title mb-1">{video.snippet.title}</p>

//         {isVideo && (
//           <div className="videoHorizontal__details">
//             <AiFillEye />
//             {numeral(views).format("0.a")} views •{" "}
//             {moment(video.snippet.publishedAt).fromNow()}
//           </div>
//         )}
//         {(searchScreen || subScreen) && (
//           <p className="mt-1 videoHorizontal__desc">
//             {video.snippet.description}
//           </p>
//         )}

//         <div className="videoHorizontal__channel d-flex align-items-center my-1">
//           {channelIcon && (
//             <LazyLoadImage
//               src={channelIcon.url}
//               effect="blur"
//               className="mr-3 rounded-circle"
//             />
//           )}
//           <p className="mb-0">{video.snippet.channelTitle}</p>
//         </div>
//         {subScreen && (
//           <p className="mt-2">
//             {video.contentDetails.totalItemCount}
//             {""}videos
//           </p>
//         )}
//       </Col>
//     </Row>
//   );
// };

// VideoHorizontal.propTypes = {
//   video: PropTypes.shape({
//     id: PropTypes.oneOfType([
//       PropTypes.shape({
//         videoId: PropTypes.string,
//       }),
//       PropTypes.string,
//     ]).isRequired,
//     snippet: PropTypes.shape({
//       channelId: PropTypes.string.isRequired,
//       channelTitle: PropTypes.string.isRequired,
//       description: PropTypes.string,
//       title: PropTypes.string.isRequired,
//       publishedAt: PropTypes.string.isRequired,
//       thumbnails: PropTypes.shape({
//         medium: PropTypes.shape({
//           url: PropTypes.string.isRequired,
//         }).isRequired,
//       }).isRequired,
//     }).isRequired,
//   }).isRequired,
//   searchScreen: PropTypes.bool,
// };

// export default VideoHorizontal;
