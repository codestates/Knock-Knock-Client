import React, { useEffect, useState } from "react";
import "../../styles/home.css";
import Nav from "../nav";
import explainImg from "../../images/explainImg.png";
import testImg1 from "../../images/testImg1.png";

const Home = () => {
  return (
    <div className="container">
      <header className="header">
        <Nav />
      </header>
      <section className="sec1">
        <div className="sec1_wrap1">
          <div className="mainDoor">
            <div className="doorLeft">
              <svg
                width="209"
                height="670"
                viewBox="0 0 209 898"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M208.5 130V760L0 897.5V0L208.5 130Z" fill="#F7E462" />
              </svg>
            </div>
            <div className="doorRight">
              <svg
                width="209"
                height="670"
                viewBox="0 0 225 897"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M-1.52588e-05 129.928V759.577L225 897V0L-1.52588e-05 129.928Z"
                  fill="#F7E462"
                />
              </svg>
            </div>
          </div>
        </div>
        <div className="sec1_wrap2">
          <div className="mouse">
            <span className="mouseDot"></span>
          </div>
        </div>
        <div className="sec1_wrap3">
          <div className="searchContainer">
            <select className="boardType">
              <option value="">게시물 유형</option>
              <option value="project">프로젝트</option>
              <option value="study">스터디</option>
            </select>
            <div className="searchBoxBoundary">|</div>
            <select className="boardPeopleNum">
              <option value="">인원수</option>
              <option value="2">2명</option>
              <option value="3">3명</option>
              <option value="4">4명</option>
              <option value="more">4명 이상</option>
            </select>
            <div className="searchBoxBoundary">|</div>
            <input type="text" className="boardSearchTextBox" />
            <button className="boardSearchBtn">
              <i class="fa fa-search"></i>
            </button>
          </div>
          <div className="mainSimpleExplain">
            <p>
              코딩 프로젝트, 스터디를 찾아주는 사이트입니다. 여러분이 원하는
            </p>
            <p>그룹을 찾고 만들어보세요!</p>
          </div>
        </div>
      </section>
      <section className="sec2">
        <div className="sec2_wrap1">
          <img src={explainImg} className="explainImg" alt="" />
        </div>
        <div className="sec2_wrap2">
          <p>새로운 사람들과 함께 나아가고 여러분의 발자취를 남겨보세요!</p>
          <p>
            여러분의 스터디, 프로젝트를 차분히 시작하거나 직접 참여해보세요!
          </p>
          <p>이제, 여러분의 시작을 두드리세요!</p>
        </div>
      </section>
      <section className="sec3">
        <div className="sec3_wrap1">
          <p>2020년, 현재까지 447 개의 프로젝트를 완료했습니다</p>
        </div>
        <div className="sec3_wrap2">
          <img src={testImg1} alt="" />
        </div>
      </section>
      <section className="sec4"></section>
      <footer className="homeFooter"></footer>
    </div>
  );
};

export default Home;