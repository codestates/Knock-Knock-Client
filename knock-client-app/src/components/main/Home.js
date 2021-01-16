import React from "react";
import "../../styles/home.css";

import explainImg from "../../images/homeImg/explainImg.png";
import testImg1 from "../../images/homeImg/testImg1.png";
// import axios from "axios";

const Home = () => {
  // axios.get("/user").then((res) => {
  //   console.log(res);
  // });

  return (
    <div className="H_container">
      <header className="H_header"></header>
      <section className="H_sec1">
        <div className="H_sec1_wrap1">
          <div className="H_mainDoor">
            <div className="H_doorLeft">
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
            <div className="H_doorRight">
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
        <div className="H_sec1_wrap2">
          <div className="H_mouse">
            <span className="H_mouseDot"></span>
          </div>
        </div>
        <div className="H_sec1_wrap3">
          <div className="H_searchContainer">
            <select className="H_boardType">
              <option value="">게시물 유형</option>
              <option value="project">프로젝트</option>
              <option value="study">스터디</option>
            </select>
            <div className="H_searchBoxBoundary">|</div>
            <select className="H_boardPeopleNum">
              <option value="">인원수</option>
              <option value="2">2명</option>
              <option value="3">3명</option>
              <option value="4">4명</option>
              <option value="more">4명 이상</option>
            </select>
            <div className="H_searchBoxBoundary">|</div>
            <input type="text" className="H_boardSearchTextBox" />
            <button className="H_boardSearchBtn">
              <i className="H_fa fa-search"></i>
            </button>
          </div>
          <div className="H_mainSimpleExplain">
            <p>
              코딩 프로젝트, 스터디를 찾아주는 사이트입니다. 여러분이 원하는
            </p>
            <p>그룹을 찾고 만들어보세요!</p>
          </div>
        </div>
      </section>
      <section className="H_sec2">
        <div className="H_sec2_wrap1">
          <img src={explainImg} className="H_explainImg" alt="" />
        </div>
        <div className="H_sec2_wrap2">
          <p>새로운 사람들과 함께 나아가고 여러분의 발자취를 남겨보세요!</p>
          <p>
            여러분의 스터디, 프로젝트를 차분히 시작하거나 직접 참여해보세요!
          </p>
          <p>이제, 여러분의 시작을 두드리세요!</p>
        </div>
      </section>
      <section className="H_sec3">
        <div className="H_sec3_wrap1">
          <p>2020년, 현재까지 447 개의 프로젝트를 완료했습니다</p>
        </div>
        <div className="H_sec3_wrap2">
          <img src={testImg1} alt="" />
        </div>
      </section>
      <section className="H_sec4">
        하이 린수 프로젝트 여기여기 ?
        <div className="H_exhibition">
          <img className="" alt="" />
          <p className="">I wanna make a dreamteam</p>
        </div>
      </section>
      <footer className="H_footer">
        <div className="H_GoToBoard" onClick={() => alert("인수바보")}>
          더보기
        </div>
      </footer>
    </div>
  );
};

export default Home;
