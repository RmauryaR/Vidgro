import React, { useEffect, useState } from "react";
import "./_comment.scss";
import Coment from "../comment/coment";
import { useDispatch, useSelector } from "react-redux";
import {
  addComment,
  getCommentsOfVideoById,
} from "../../redux/actions/comments.action";
const Comments = ({ videoId, totalComments }) => {
  const dispatch = useDispatch();
  const [text, setText] = useState("");
  useEffect(() => {
    dispatch(getCommentsOfVideoById(videoId));
  }, [videoId, dispatch]);

  const comments = useSelector((state) => state.commentList.comments);
  const loading = useSelector((state) => state.commentList.loading);

  console.log("Comments from state: ", comments); // Debugging line

  const _comments = comments?.map(
    (comment) => comment.snippet.topLevelComment.snippet
  );

  const handleComment = (e) => {
    e.preventDefault();
    if (text.length === 0) return;
    dispatch(addComment(videoId, text));
    setText("");
  };
  return (
    <div className="comments">
      <p>{totalComments} comments</p>
      <div className="comment__form d-flex w-100 my-2">
        <img
          src="https://static.vecteezy.com/system/resources/thumbnails/027/951/137/small_2x/stylish-spectacles-guy-3d-avatar-character-illustrations-png.png"
          alt=""
          className="rounded-circle mr-3"
        />
        <form onSubmit={handleComment} className="d-flex flex-grow-1">
          <input
            type="text"
            className="flex-grow-1"
            placeholder="write a comment..."
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
          <button className="border-0 p-2">comment</button>
        </form>
      </div>
      <div className="comment_list">
        {loading && <p>Loading comments...</p>}
        {_comments?.map((comment, i) => (
          <Coment comment={comment} key={i} />
        ))}
      </div>
    </div>
  );
};

export default Comments;
