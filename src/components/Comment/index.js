import React from "react";
import moment from "moment";
const Comment = ({ comment }) => {
  return (
    <div>
      <hr />
      <h5>
        {comment.username} {moment(new Date(comment.timestamp)).fromNow()}
      </h5>
      <p>{comment.comment}</p>
    </div>
  );
};

export default Comment;
