import React, { useState, useEffect } from "react";
import "../../styles/roomInfo.css";
import together from "../../images/boardImg/together.png";
import PostReply from "./postReply";
import axios from "axios";

const RoomInfo = (props) => {
  const [reply, setReply] = useState([]); //
  const [text, setText] = useState("");
  const [errmessage, setErrmessage] = useState("");

  const getPostComments = () => {
    // const postComments = await axios.get(
    //   `http://localhost:4000/comments?postid=${props.location.state.id}`
    // );
    //setReply(postComments.data.data);
  };

  const sendReply = (e) => {
    let date = new Date().toLocaleDateString().split("/");
    let [day, month] = [date[0], date[1]];
    date[0] = month;
    date[1] = day;
    let updated_At = date.reverse();
    let replyInfo = {};
    if (text === "") {
      setErrmessage("텍스트를 입력하세요");
    } else {
      setErrmessage("");
      replyInfo = {
        username: "Im24기 이준희",
        date: updated_At,
        text: text,
      };
    }
    setReply(() => [...reply, replyInfo]);
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

  useEffect(() => {});

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
              <div>{errmessage}</div>
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
