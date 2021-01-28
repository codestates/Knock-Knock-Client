/* eslint-disable */
import React from "react";
import axios from "axios";
import "../../styles/mypage.css";
import { mbti, stacks } from "../../utils/options";
import Profile from "./Profile";
import PrintLogo from "../mypage/PrintStackLogo";

class MngAccount extends React.Component {
  constructor(props) {
    super(props);

    this.mypageClickHandler = this.mypageClickHandler.bind(this);
    this.userGrade = this.userGrade.bind(this);
    this.userPropensity = this.userPropensity.bind(this);
    this.userMood = this.userMood.bind(this);
    this.storageInfo = this.storageInfo.bind(this);
    this.getStack = this.getStack.bind(this);
    this.retrospectClickHandler = this.retrospectClickHandler.bind(this);
    this.getHisfromAccWithProfile = this.getHisfromAccWithProfile.bind(this);

    this.state = {
      isMypage: true,
      userInfo: {},
      userStack: [],
    };
    this.grade = "";
    this.propensity = "";
    this.mood = "";
    this.stack = [];

    this.mbtiChecker = mbti.map((el, idx) => {
      return (
        <option key={idx} value={el}>
          {el}
        </option>
      );
    });
  }

  mypageClickHandler() {
    // 사용자 info 값 전달해야됨
    this.props.history.push("/mypage");
    this.setState({ isMypage: false });
  }

  userGrade(value) {
    this.grade = value.target.value;
  }

  userPropensity(value) {
    this.propensity = value.target.value;
  }

  userMood(value) {
    this.mood = value.target.value;
  }

  getStack(e) {
    if (this.stack.includes(e)) {
      this.stack.splice(this.stack.indexOf(e), 1);
      this.setState({ userStack: this.stack });
    } else {
      this.stack.push(e);
      this.setState({ userStack: this.stack });
    }
    console.log("프로필의 스택입니다.", this.stack);
  }

  storageInfo() {
    let userInfo = {
      username: this.grade,
      persona: this.propensity,
      mood: this.mood,
      user_stacks: `${String(this.stack)}`,
    };

    axios
      .post("https://localhost:4000/profile", userInfo, {
        withCredentials: true,
      })
      .then((updatedUserInfo) => {
        console.log("수정된 사용자 정보 = ", updatedUserInfo);
        this.props.history.push("/mypage", userInfo);
      });
  }

  retrospectClickHandler() {
    this.props.history.push("/mngHistory");
  }

  getHisfromAccWithProfile() {
    this.props.getHistoryHandler(this.props.history);
  }

  render() {
    return (
      <div className="mypageContainer">
        <div className="mypageContainer_blankSec"></div>
        <Profile
          isMypage={this.state.isMypage}
          mypageClickHandler={this.mypageClickHandler}
          retrospectClickHandler={this.retrospectClickHandler}
          userInfo={this.state.userInfo}
          modalLoginHandler={this.props.modalLoginHandler}
          getHisfromAccWithProfile={this.getHisfromAccWithProfile}
        />
        <div className="mypageContainer_editUserInfoFormSec">
          <div className="editUserInfoFormSec_term">
            <div className="editUserInfoFormSec_term_phrase">
              <h1>코드스테이츠의 기수와 이름을 반드시 입력해주세요.</h1>

              <input
                onChange={(e) => this.userGrade(e)}
                tpye="text"
                placeholder="예시) PRE7기 이준희"
              />
            </div>
          </div>
          <div className="editUserInfoFormSec_propensity">
            <div className="editUserInfoFormSec_propensity_phrase">
              <h1>회원님의 성향을 체크해주세요</h1>
              <select onChange={this.userPropensity}>{this.mbtiChecker}</select>
            </div>
          </div>
          <div className="editUserInfoFormSec_mood">
            <div className="editUserInfoFormSec_mood_phrase">
              <h1> 오늘 기분에 대해 알려주세요</h1>
              <textarea
                onChange={(e) => {
                  this.userMood(e);
                }}
                placeholder="오늘 기분을 알려주세요 : )"
              />
            </div>
          </div>
          <div className="editUserInfoFormSec_mood">
            <div className="editUserInfoFormSec_mood_phrase">
              <h1>
                {this.state.username}님이 주로 사용하는 스택을 선택해주세요.
              </h1>
              <div className="showStack">
                {`현재 ${this.state.userStack}을 선택하셨습니다.`}
              </div>
              <PrintLogo userStack={this.getStack} />
            </div>
          </div>
          <div className="editUserInfoFormSec_saveBtn">
            <button onClick={() => this.storageInfo()}>내마음속에저장</button>
          </div>
        </div>
      </div>
    );
  }
}

export default MngAccount;
