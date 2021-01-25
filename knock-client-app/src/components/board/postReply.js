/* eslint-disable */
import axios from "axios";
import React, { useEffect, useState } from "react";
import "../../styles/roomInfo.css";

const PostReply = (props) => {
  const [userId, setUserId] = useState("");

  useEffect(async () => {
    const userInfo = await axios.get("https://localhost:4000/profile", {
      withCredentials: true,
    });

    setUserId(userInfo.data.userdata.id);
    console.log(userId);
  });

  // 날짜기준으로 정렬 하기
  // 혹시몰라서 놔둠
  //props.value.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));

  const comment = props.value.map((value, idx) => {
    let created_at;
    if (value.created_at) {
      created_at = value.created_at.split("T")[0];
    }
    if (idx >= 0) {
      return (
        <li key={idx} value={value.id} className="postReply">
          {value.user_id === userId ? (
            <button
              className="reply_del_btn"
              onClick={() => props.deleteCommentHandler(value.id)}
            >
              X
            </button>
          ) : (
            <></>
          )}
          <div className="reply_info">
            <div className="reply_username_date">
              <p className="reply_username">{value.writer}</p>
              <p className="reply_date">{created_at}</p>
            </div>
            <p className="reply_text">{value.comment}</p>
          </div>
        </li>
      );
    }
  });

  return <>{comment}</>;
};

export default PostReply;
