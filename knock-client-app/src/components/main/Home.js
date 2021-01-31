/* eslint-disable */
import React from "react";
import "../../styles/home.css";
import "../../styles/carousel.css";
import homeMainSecLogo from "../../images/homeImg/knockknocklogo.png";
import homeMainSecOpenDoor from "../../images/homeImg/opendoor.png";
import homeMainSecPerson from "../../images/homeImg/person.png";
import study from "../../images/homeImg/study.png";
import project from "../../images/homeImg/project.png";
import question from "../../images/homeImg/question.png";
import retrospect from "../../images/homeImg/retrospect.png";
import homeMainSec1Img from "../../images/homeImg/main_sec1_img.png";
import Layer96 from "../../images/homeImg/Layer96.png";
import Layer97_1 from "../../images/homeImg/Layer97-1.png";
import Layer97_2 from "../../images/homeImg/Layer97-2.png";
import Layer97_3 from "../../images/homeImg/Layer97-3.png";
import Layer97_4 from "../../images/homeImg/Layer97-4.png";
import Layer98 from "../../images/homeImg/Layer98.png";
import carouselArrowDark from "../../images/homeImg/carousel-arrow-dark.png";

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
          <img src={Layer96} alt="" />
        </section>

        <section className="H_sec3">
          <div className="carousel-wrapper">
            <span id="target-item-1"></span>
            <span id="target-item-2"></span>
            <span id="target-item-3"></span>
            <span id="target-item-4"></span>

            <div className="carousel-item item-1">
              <img src={Layer97_1} alt="" />
              <a className="arrow arrow-prev" href="#target-item-4">
                <img src={carouselArrowDark} alt="" />
              </a>
              <a className="arrow arrow-next" href="#target-item-2">
                <img src={carouselArrowDark} alt="" />
              </a>
            </div>

            <div className="carousel-item item-2">
              <img src={Layer97_2} alt="" />
              <a className="arrow arrow-prev" href="#target-item-1">
                <img src={carouselArrowDark} alt="" />
              </a>
              <a className="arrow arrow-next" href="#target-item-3">
                <img src={carouselArrowDark} alt="" />
              </a>
            </div>
            <div className="carousel-item item-3">
              <img src={Layer97_3} alt="" />
              <a className="arrow arrow-prev" href="#target-item-2">
                <img src={carouselArrowDark} alt="" />
              </a>
              <a className="arrow arrow-next" href="#target-item-4">
                <img src={carouselArrowDark} alt="" />
              </a>
            </div>
            <div className="carousel-item item-4">
              <img src={Layer97_4} alt="" />
              <a className="arrow arrow-prev" href="#target-item-3">
                <img src={carouselArrowDark} alt="" />
              </a>
              <a className="arrow arrow-next" href="#target-item-1">
                <img src={carouselArrowDark} alt="" />
              </a>
            </div>
          </div>
        </section>

        <section className="H_sec4">
          {/* <img src={Layer98} alt="" /> */}
        </section>

        <section className="H_sec5">
          <img src={project} onClick={() => props.history.push("/board")} />
          <img src={study} onClick={() => props.history.push("/board")} />
          <img src={question} onClick={() => props.history.push("/board")} />
          <img
            src={retrospect}
            onClick={() =>
              alert("회고기능은 로그인을 하셔야 이용이 가능합니다. : )")
            }
          />
        </section>
        <footer className="H_footer"></footer>
      </div>
    </>
  );
};

export default Home;
