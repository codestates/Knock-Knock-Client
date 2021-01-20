import React, { useState } from "react";
import "../../styles/roomInfo.css";
import together from "../../images/boardImg/together.png";
import PostReply from "./postReply";

const RoomInfo = () => {
  const [reply, setReply] = useState([]); //
  const [text, setText] = useState("");

  const postReply = () => {
    let date = new Date().toLocaleDateString().split("/");
    let [day, month] = [date[0], date[1]];
    date[0] = month;
    date[1] = day;
    let updated_At = date.reverse();

    let replyInfo = {
      username: "Im24기 이준희",
      date: updated_At,
      text: text,
    };

    setReply(reply.push(replyInfo));

    console.log("this is reply", reply);
    console.log("이건 리플 인포", replyInfo);
  };

  const btnList = ["All", "Study", "Project", "Q&A", "그룹만들기"];
  const sideBar = btnList.map((el, idx) => {
    return (
      <li className="C_filterBtn" key={idx}>
        {el}
      </li>
    );
  });

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
            이 부분은 댓글을 확인할 수 있는 부분입니다.
            <ul className="ReplyPlace">
              <PostReply value={reply} />
            </ul>
            <textarea
              onChange={(e) => setText(e.target.value)}
              className="ReplyBox"
            />
            <button onClick={() => postReply()} className="SendBtn">
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
