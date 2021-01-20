import React from "react";
import "../../styles/history.css";

const PostReply = (props) => {
  console.log("프랍스", props);
  const comment = props.value.map((value, idx) => {
    if (idx >= 0) {
      return (
        <li key={idx} className="postReply">
          <p className="reply_username">{value.username}</p>
          <p className="reply_date">{value.date}</p>
          <p className="reply_text">{value.text}</p>
        </li>
      );
    }
  });

  return <>{comment}</>;
};

export default PostReply;
