import React from "react";

const RoomInfo = () => {
  const btnList = ["All", "Study", "Project", "Q&A", "그룹만들기"];

  return (
    <div>
      <header>
        <div>여기는 게시판 글입니다.</div>
      </header>
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
    </div>
  );
};

export default RoomInfo;
