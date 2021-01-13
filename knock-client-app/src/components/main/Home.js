import React, { useEffect, useState } from "react";
import "../../styles/home.css";
import Nav from "../nav";

const Home = () => {
  return (
    <div className="container">
      <header className="homeHeader">
        <Nav />
      </header>
      <body className="homeBody">
        <div className="searchContainer">
          <select className="boardType">
            <option>게시물 유형</option>
            <option value="project">프로젝트</option>
            <option value="study">스터디</option>
            <option value="qna">QnA</option>
          </select>
          <select className="personNum">
            <option>인원수</option>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="more">4명 이상</option>
          </select>

          <input type="text" className="searchTextBox" />
          <button className="searchBtn">검색</button>
        </div>
        <div className="body">나는 바보야</div>
      </body>
      <footer className="homeFooter"></footer>
    </div>
  );
};

export default Home;
