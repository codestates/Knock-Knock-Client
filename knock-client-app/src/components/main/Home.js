/* eslint-disable */
import React from "react";
import "../../styles/home.css";
import homeMainSecLogo from "../../images/homeImg/knockknocklogo.png";
import homeMainSecOpenDoor from "../../images/homeImg/opendoor.png";
import homeMainSecPerson from "../../images/homeImg/person.png";
import explainImg from "../../images/homeImg/explainImg.png";
import study from "../../images/homeImg/study.png";
import project from "../../images/homeImg/project.png";
import question from "../../images/homeImg/question.png";
import retrospect from "../../images/homeImg/retrospect.png";
import homeMainSec1Img from "../../images/homeImg/main_sec1_img.png";

import interviewImg from "../../images/homeImg/interview.png";
import processImg from "../../images/homeImg/process.png";

const Home = (props) => {
  const searchParams = {
    boardType: "",
    boardPeopleNum: "",
    boardSearchText: "",
  };

  function boardTypeHandler(event) {
    searchParams.boardType = event.target.value;
  }

  function boardPeopleNumHandler(event) {
    searchParams.boardPeopleNum = event.target.value;
  }

  function boardSearchTextHandler(event) {
    searchParams.boardSearchText = event.target.value;
  }
  // 홈에서 검색 필터
  async function boardSearchClickHandler() {
    props.history.push("/board", searchParams);
  }

  function moreBoardHandler() {
    props.history.push("/board");
  }

  return (
    <>
      <div className="H_container">
        <section className="H_main_sec">
          <a href="#H_sec1" className="home_main_sec_person">
            <img src={homeMainSecPerson} />
          </a>
          <img src={homeMainSecOpenDoor} className="home_main_sec_open_door" />
          <img src={homeMainSecLogo} className="home_main_sec_logo" />
        </section>
        <section className="H_sec1" id="H_sec1">
          <div className="H_sec1_wrap1">
            <img src={homeMainSec1Img} alt="" />
          </div>

          <div className="H_sec1_wrap3">
            <div className="H_mainSimpleExplain">
              <h1>Knock Knock!</h1>
              <p>새로운 사람들과 의미있는 무언가를 만들어볼 준비가 되셨나요?</p>
              <p>함께 나아가고 여러분의 발자취를 남겨보세요!</p>
            </div>
            <div className="H_searchContainer">
              <select className="H_boardType" onChange={boardTypeHandler}>
                <option value="">게시물 유형</option>
                <option value="project">프로젝트</option>
                <option value="study">스터디</option>
                <option value="question">{"Q&A"}</option>
              </select>
              <div className="H_searchBoxBoundary">|</div>
              <select
                className="H_boardPeopleNum"
                onChange={boardPeopleNumHandler}
              >
                <option value="">인원수</option>
                <option value="2">2명</option>
                <option value="3">3명</option>
                <option value="4">4명</option>
                <option value="5">5명</option>
                <option value="6">6명</option>
                <option value="7">7명</option>
                <option value="8">8명</option>
              </select>
              <div className="H_searchBoxBoundary">|</div>
              <input
                type="text"
                className="H_boardSearchTextBox"
                placeholder="검색어를 입력해주세요"
                onChange={boardSearchTextHandler}
              />
              <div className="H_boardSearchBtn">
                <img
                  className="H_borardSearchBtnIcon"
                  src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/0b/Search_Icon.svg/1024px-Search_Icon.svg.png"
                  onClick={boardSearchClickHandler}
                />
              </div>
            </div>
          </div>
        </section>
        <section className="H_sec2">
          <img src={interviewImg} alt="" />
        </section>

        <section className="H_sec3">
          <img src={processImg} alt="" />
        </section>

        <section className="H_sec5">
          <img src={project} onClick={() => props.history.push("/board")} />
          <img src={study} onClick={() => props.history.push("/board")} />
          <img src={question} onClick={() => props.history.push("/board")} />
          <img src={retrospect} onClick={() => alert("회고를 기록하세요!")} />
        </section>
        <footer className="H_footer"></footer>
      </div>
    </>
  );
};

export default Home;
