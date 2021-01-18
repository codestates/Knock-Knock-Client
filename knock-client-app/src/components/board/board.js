import React from "react";
import "../../styles/board.css";
import together from "../../images/boardImg/together.png";
import closed from "../../images/boardImg/closed.png";
import question from "../../images/boardImg/Question.png";
import study from "../../images/boardImg/studyGroup.png";

const PublicBoard = () => {
  const btnList = ["All", "Study", "Project", "Q&A", "그룹만들기"];

  return (
    <div>
      {/* <header className="B_header"></header> */}
      <div className="B_flexbox-container">
        <nav className="B_SideBarSec">
          <ul>
            {btnList.map((el, idx) => {
              return (
                <li className="B_filterBtn" key={idx}>
                  {el}
                </li>
              );
            })}
          </ul>
        </nav>
        <tbody className="B_RoomContaniner">
          <div className="B_RoomCard">
            <img src={together} className="B_Img1" alt="" />
            <p className="B_desc">I wanna make a dreamteam</p>
          </div>
          <div className="B_RoomCard">
            <img src={closed} className="B_Img2" alt="" />
            <p className="B_desc">went to project</p>
          </div>
          <div className="B_RoomCard">
            <img src={study} className="B_Img3" alt="" />
            <p className="B_desc">I'm eager to know COCO!</p>
          </div>
          <div className="B_RoomCard">
            <img src={question} className="B_Img4" alt="" />
            <p className="B_desc">Do you wanna build the snowMan?</p>
          </div>
        </tbody>
      </div>
      <footer className="B_footer">Welcome to the party</footer>
    </div>
  );
};

export default PublicBoard;
