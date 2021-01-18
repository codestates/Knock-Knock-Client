import React from "react";
import axios from "axios";
import "../../styles/mypage.css";

import Profile from "./Profile";

class Mypage extends React.Component {
  constructor(props) {
    super(props);

    this.accountMngClickHandler = this.accountMngClickHandler.bind(this);

    this.state = {
      isAccountMng: true,
      isMypage: false,
    };

    console.log(this.props);
  }

  accountMngClickHandler() {
    this.props.history.push("/mngAccount");
    this.setState({ isAccountMng: false });
  }

  render() {
    return (
      <div className="mypageContainer">
        <div className="mypageContainer_blankSec"></div>
        <Profile
          isAccountMng={this.state.isAccountMng}
          isMypage={this.state.isMypage}
          accountMngClickHandler={this.accountMngClickHandler}
          userInfo={this.props.location.state}
        />
        <div className="mypageContainer_boardListSec">
          <div className="boardListSec_openboardWrap">
            <div className="openboardWrap_title">
              <h1>열린 게시물</h1>
            </div>
            <div className="openboardWrap_boardList">
              <div className="boardList_openboard">
                <div className="boardList_openboard_brief">
                  <h1>파이썬 2주안에 뽀개기</h1>
                  <h2>인원: 6/10</h2>
                  <h2>진행중</h2>
                </div>
                <div className="boardList_openboard_detail">
                  <div className="openboard_detail_title_writer">
                    <h1>파이썬 2주안에 뽀개기</h1>
                    <h2>그룹장: jnoodle</h2>
                  </div>
                  <p>
                    2주 안에 다같이 파이썬을 뽀개 봅시다. 매주 러버덕 형식으로
                    파이썬을 공부하고, 예제를 따라합니다.
                  </p>
                </div>
              </div>
              <div className="boardList_openboard">
                <div className="boardList_openboard_brief">
                  <h1>파이썬 2주안에 뽀개기</h1>
                  <h2>인원: 6/10</h2>
                  <h2>진행중</h2>
                </div>
                <div className="boardList_openboard_detail">
                  <div className="openboard_detail_title_writer">
                    <h1>파이썬 2주안에 뽀개기</h1>
                    <h2>그룹장: jnoodle</h2>
                  </div>
                  <p>
                    2주 안에 다같이 파이썬을 뽀개 봅시다. 매주 러버덕 형식으로
                    파이썬을 공부하고, 예제를 따라합니다.
                  </p>
                </div>
              </div>
              <div className="boardList_openboard">
                <div className="boardList_openboard_brief">
                  <h1>파이썬 2주안에 뽀개기</h1>
                  <h2>인원: 6/10</h2>
                  <h2>진행중</h2>
                </div>
                <div className="boardList_openboard_detail">
                  <div className="openboard_detail_title_writer">
                    <h1>파이썬 2주안에 뽀개기</h1>
                    <h2>그룹장: jnoodle</h2>
                  </div>
                  <p>
                    2주 안에 다같이 파이썬을 뽀개 봅시다. 매주 러버덕 형식으로
                    파이썬을 공부하고, 예제를 따라합니다.
                  </p>
                </div>
              </div>
              <div className="boardList_openboard">
                <div className="boardList_openboard_brief">
                  <h1>파이썬 2주안에 뽀개기</h1>
                  <h2>인원: 6/10</h2>
                  <h2>진행중</h2>
                </div>
                <div className="boardList_openboard_detail">
                  <div className="openboard_detail_title_writer">
                    <h1>파이썬 2주안에 뽀개기</h1>
                    <h2>그룹장: jnoodle</h2>
                  </div>
                  <p>
                    2주 안에 다같이 파이썬을 뽀개 봅시다. 매주 러버덕 형식으로
                    파이썬을 공부하고, 예제를 따라합니다.
                  </p>
                </div>
              </div>
              <div className="boardList_openboard">
                <div className="boardList_openboard_brief">
                  <h1>파이썬 2주안에 뽀개기</h1>
                  <h2>인원: 6/10</h2>
                  <h2>진행중</h2>
                </div>
                <div className="boardList_openboard_detail">
                  <div className="openboard_detail_title_writer">
                    <h1>파이썬 2주안에 뽀개기</h1>
                    <h2>그룹장: jnoodle</h2>
                  </div>
                  <p>
                    2주 안에 다같이 파이썬을 뽀개 봅시다. 매주 러버덕 형식으로
                    파이썬을 공부하고, 예제를 따라합니다.
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="boardListSec_closeboardWrap">
            <div className="closeboardWrap_title">
              <h1>닫힌 게시물</h1>
            </div>
            <div className="closeboardWrap_boardList">
              <div className="boardList_closeboard">
                <div className="boardList_closeboard_brief">
                  <h1>파이썬 2주안에 뽀개기</h1>
                  <h2>인원: 6/10</h2>
                  <h2>종료</h2>
                </div>
                <div className="boardList_closeboard_detail">
                  <div className="closeboard_detail_title_writer">
                    <h1>파이썬 2주안에 뽀개기</h1>
                    <h2>그룹장: jnoodle</h2>
                  </div>
                  <p>
                    2주 안에 다같이 파이썬을 뽀개 봅시다. 매주 러버덕 형식으로
                    파이썬을 공부하고, 예제를 따라합니다.
                  </p>
                </div>
              </div>
              <div className="boardList_closeboard">
                <div className="boardList_closeboard_brief">
                  <h1>파이썬 2주안에 뽀개기</h1>
                  <h2>인원: 6/10</h2>
                  <h2>종료</h2>
                </div>
                <div className="boardList_closeboard_detail">
                  <div className="closeboard_detail_title_writer">
                    <h1>파이썬 2주안에 뽀개기</h1>
                    <h2>그룹장: jnoodle</h2>
                  </div>
                  <p>
                    2주 안에 다같이 파이썬을 뽀개 봅시다. 매주 러버덕 형식으로
                    파이썬을 공부하고, 예제를 따라합니다.
                  </p>
                </div>
              </div>
              <div className="boardList_closeboard">
                <div className="boardList_closeboard_brief">
                  <h1>파이썬 2주안에 뽀개기</h1>
                  <h2>인원: 6/10</h2>
                  <h2>종료</h2>
                </div>
                <div className="boardList_closeboard_detail">
                  <div className="closeboard_detail_title_writer">
                    <h1>파이썬 2주안에 뽀개기</h1>
                    <h2>그룹장: jnoodle</h2>
                  </div>
                  <p>
                    2주 안에 다같이 파이썬을 뽀개 봅시다. 매주 러버덕 형식으로
                    파이썬을 공부하고, 예제를 따라합니다.
                  </p>
                </div>
              </div>
              <div className="boardList_closeboard">
                <div className="boardList_closeboard_brief">
                  <h1>파이썬 2주안에 뽀개기</h1>
                  <h2>인원: 6/10</h2>
                  <h2>종료</h2>
                </div>
                <div className="boardList_closeboard_detail">
                  <div className="closeboard_detail_title_writer">
                    <h1>파이썬 2주안에 뽀개기</h1>
                    <h2>그룹장: jnoodle</h2>
                  </div>
                  <p>
                    2주 안에 다같이 파이썬을 뽀개 봅시다. 매주 러버덕 형식으로
                    파이썬을 공부하고, 예제를 따라합니다.
                  </p>
                </div>
              </div>
              <div className="boardList_closeboard">
                <div className="boardList_closeboard_brief">
                  <h1>파이썬 2주안에 뽀개기</h1>
                  <h2>인원: 6/10</h2>
                  <h2>종료</h2>
                </div>
                <div className="boardList_closeboard_detail">
                  <div className="closeboard_detail_title_writer">
                    <h1>파이썬 2주안에 뽀개기</h1>
                    <h2>그룹장: jnoodle</h2>
                  </div>
                  <p>
                    2주 안에 다같이 파이썬을 뽀개 봅시다. 매주 러버덕 형식으로
                    파이썬을 공부하고, 예제를 따라합니다.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Mypage;
