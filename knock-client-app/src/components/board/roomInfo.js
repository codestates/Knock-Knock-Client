import React, { useState, useEffect } from "react";
import "../../styles/roomInfo.css";
import together from "../../images/boardImg/together.png";
import PostReply from "./postReply";
import axios from "axios";

const RoomInfo = (props) => {
  const [reply, setReply] = useState([]); //
  const [text, setText] = useState("");
  const [errmessage, setErrmessage] = useState("");

  const getPostComments = async () => {
    const postComments = await axios.get(
      `https://localhost:4000/comments/${props.location.state.id}`,
      { withCredentials: true }
    );

    setReply(postComments.data.data);
  };

  const sendReply = (e) => {
    if (text === "") {
      setErrmessage("텍스트를 입력하세요");
    } else {
      setErrmessage("");

      axios
        .get("https://localhost:4000/profile", { withCredentials: true })
        .then((getUserInfo) => {
          const { id, username } = getUserInfo.data.userData;
          axios
            .post(
              "https://localhost:4000/comments",
              {
                writer: username,
                comment: text,
                userid: id,
                postid: props.location.state.id,
              },
              { withCredentials: true }
            )
            .then((postComments) => {
              setReply(postComments.data.data);
            });
        });
    }
  };

  const btnList = ["All", "Study", "Project", "Q&A", "그룹만들기"];
  const sideBar = btnList.map((el, idx) => {
    return (
      <li className="C_filterBtn" key={idx}>
        {el}
      </li>
    );
  });

  function commentChangeHandler(event) {
    setText(event.target.value);
  }

  useEffect(() => {
    getPostComments();
  }, []);

  return (
    <div className="C_flexbox-container">
      <header className="board"></header>
      <div className="Body_sec">
        <nav className="C_SideBarSec">
          <ul>{sideBar}</ul>
        </nav>
        <div className="C_RoomContaniner">
          <div className="PostCard">
            <img src={together} className="card1" />
          </div>
          <div className="RoomInfo">
            이 부분이 룸 인포가 들어가는 부분입니다.
          </div>
          {/* 룸인포 -> 방정보/ 프로젝트or스터디orQuestion에 대한 소개글 [피그마 참고]*/}
          <div className="ReplyZone">
            {errmessage ? (
              <ul>
                <PostReply value={reply} />
                <li>{errmessage}</li>
              </ul>
            ) : (
              <ul>
                <PostReply value={reply} />
              </ul>
            )}
            <textarea onChange={commentChangeHandler} className="ReplyBox" />
            <button onClick={sendReply} className="SendBtn">
              Send
            </button>
          </div>
        </div>
      </div>
      <footer className="C_footer">Welcome to the party</footer>
    </div>
  );
};
export default RoomInfo;
