import React from "react";
import "../../styles/home.css";

import explainImg from "../../images/homeImg/explainImg.png";
import testImg1 from "../../images/homeImg/testImg1.png";
import axios from "axios";

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

  async function boardSearchClickHandler() {
    props.history.push("/board", searchParams);
  }

  function moreBoardHandler() {
    props.history.push("/board", searchParams);
  }

  return (
    <div className="H_container">
      <section className="H_sec1">
        <div className="H_sec1_wrap1">
          <div className="H_mainDoor">
            <img
              src="https://maxcdn.icons8.com/app/uploads/2019/10/teamwork-illustration-design-process.png"
              alt=""
            />
          </div>
        </div>
        <div className="H_sec1_wrap2">
          <div className="H_mouse">
            <span className="H_mouseDot"></span>
          </div>
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
              <option value="more">4명 이상</option>
            </select>
            <div className="H_searchBoxBoundary">|</div>
            <input
              type="text"
              className="H_boardSearchTextBox"
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
        <div className="H_sec2_wrap1">
          <p>새로운 사람들과 함께 나아가고 여러분의 발자취를 남겨보세요!</p>
          <p>
            여러분의 스터디, 프로젝트를 차분히 시작하거나 직접 참여해보세요!
          </p>
          <p>이제, 여러분의 시작을 두드리세요!</p>
        </div>
        <div className="H_sec2_wrap2">
          <img src={explainImg} className="H_explainImg" alt="" />
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
        <div className="H_exhibition">
          <img className="" alt="" />
          <p className="">I wanna make a dreamteam</p>
        </div>
        <div className="H_exhibition">
          <img className="" alt="" />
          <p className="">I wanna make a dreamteam</p>
        </div>
        <div className="H_exhibition">
          <img className="" alt="" />
          <p className="">I wanna make a dreamteam</p>
        </div>
      </section>
      <footer className="H_footer">
        <div className="H_GoToBoard" onClick={moreBoardHandler}>
          더보기
        </div>
      </footer>
    </div>
  );
};

export default Home;
