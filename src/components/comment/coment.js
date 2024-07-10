import React from "react";
import moment from "moment";
import "./_coment.scss";
const Comment = (comment) => {
  const { authorDisplayName, authorProfileImageUrl, publishedAt, textDisplay } =
    comment;

  return (
    <div className="comment p-2 d-flex">
      <img
        src="https://www.clipartmax.com/png/middle/248-2487966_matthew-man-avatar-icon-png.png"
        alt="/"
        className="rounded-circle mr-3"
      />
      <div className="comment__body">
        <p className="comment__header mb-1">
          {authorDisplayName} • {moment(publishedAt).fromNow()}
        </p>
        <p className="mb-0">{textDisplay}</p>
      </div>
    </div>
  );
};

export default Comment;
