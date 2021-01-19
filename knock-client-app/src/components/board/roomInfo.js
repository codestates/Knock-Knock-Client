import React from "react";
import "../../styles/roomInfo.css";
const RoomInfo = () => {
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
      <nav className="C_SideBarSec">
        <ul>{sideBar}</ul>
      </nav>
      <div className="C_RoomContaniner"></div>
      <footer className="C_footer">Welcome to the party</footer>
    </div>
  );
};

export default RoomInfo;
