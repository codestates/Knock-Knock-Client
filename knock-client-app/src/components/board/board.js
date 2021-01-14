import React from "react";

import "../../styles/board.css";
import together from "../../images/together.png";

const PublicBoard = () => {
  const btnList = ["All", "Study", "Project", "Q&A", "그룹만들기"];

  return (
    <div>
      <header className="B_header"></header>
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
        <body className="B_RoomContaniner">
          <div className="B_RoomCard">
            <img src={together} className="B_Img1" alt="" />
            <p className="B_desc">teamwork makes dream-works</p>
          </div>
          <div className="B_RoomCard">
            <img src={together} className="B_Img1" alt="" />
            <p className="B_desc">teamwork makes dream-works</p>
          </div>
          <div className="B_RoomCard">
            <img src={together} className="B_Img1" alt="" />
            <p className="B_desc">teamwork makes dream-works</p>
          </div>
        </body>
      </div>
      <footer className="B_footer">Welcome to the party</footer>
    </div>
  );
};

export default PublicBoard;
