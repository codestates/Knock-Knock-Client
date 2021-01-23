import axios from "axios";
import React from "react";
import "../../styles/history.css";

const PostReply = (props) => {
  const deleteComment = (e) => {
    console.log(props.value);
    // console.log("??", e.target);
    console.log(
      "asdas",
      props.value.filter((el) => el.id.includes(e.target.value))
    );

    // const body ={

    // }
    const userInfo = axios
      .get("https://localhost:4000/profile", {
        withCredentials: true,
      })
      .then((data) => {
        console.log(data);
        // if( data.data.userdata.id === props.value)
        // axios.delete("https://localhost:4000/comments", {});
      });
  };
  const comment = props.value.map((value, idx) => {
    if (idx >= 0) {
      return (
        <li key={idx} value={value.id} className="postReply">
          <button value={value.id} onClick={(e) => deleteComment(e)}>
            삭제버튼
          </button>
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
