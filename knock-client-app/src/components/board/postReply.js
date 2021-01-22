import React from "react";
import "../../styles/history.css";

const PostReply = (props) => {
  const comment = props.value.map((value, idx) => {
    if (idx >= 0) {
      return (
        <li key={idx} className="postReply">
          <p className="reply_username">{value.writer}</p>
          <p className="reply_date">{value.created_at}</p>
          <p className="reply_text">{value.comment}</p>
        </li>
      );
    }
  });

  return <>{comment}</>;
};

export default PostReply;
