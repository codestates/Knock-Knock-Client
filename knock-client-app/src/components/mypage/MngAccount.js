import React from "react";
import axios from "axios";
import "../../styles/mypage.css";
import { mbti, stacks } from "../../utils/options";
import Profile from "./Profile";

class MngAccount extends React.Component {
  constructor(props) {
    super(props);

    this.mypageClickHandler = this.mypageClickHandler.bind(this);
    this.userGrade = this.userGrade.bind(this);
    this.userPropensity = this.userPropensity.bind(this);
    this.userMood = this.userMood.bind(this);
    this.storageInfo = this.storageInfo.bind(this);
    this.userStack = this.userStack.bind(this);
    this.retrospectClickHandler = this.retrospectClickHandler.bind(this);

    this.state = {
      isMypage: true,
      userInfo: {},
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

    this.stackList = stacks.map((el, idx) => {
      return (
        <>
          <input
            onChange={this.userStack}
            type="checkbox"
            id={el}
            name="stack"
            value={el}
            key={idx}
          />
          <label htmlFor={el}>{el}</label>
        </>
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

  userStack(value) {
    if (value.target.checked) {
      this.stack.push(value.target.value);
    } else {
      this.stack.splice(this.stack.indexOf(value.target.value), 1);
    }
    console.log(this.stack);
  }

  userMood(value) {
    this.mood = value.target.value;
  }

  storageInfo() {
    let userInfo = {
      username: this.grade,
      persona: this.propensity,
      mood: this.mood,
      user_stacks: `${String(this.stack)}`,
    };
    console.log("userInfo = ", userInfo);

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

  render() {
    return (
      <div className="mypageContainer">
        <div className="mypageContainer_blankSec"></div>
        <Profile
          isMypage={this.state.isMypage}
          mypageClickHandler={this.mypageClickHandler}
          retrospectClickHandler={this.retrospectClickHandler}
          userInfo={this.state.userInfo}
        />
        <div className="mypageContainer_editUserInfoFormSec">
          <div className="editUserInfoFormSec_term">
            <div className="editUserInfoFormSec_term_phrase">
              <h1>{this.state.username}님의 기수를 선택해주세요</h1>
              <input
                onChange={(e) => this.userGrade(e)}
                tpye="text"
                placeholder="PRE7기 이준희"
              />
            </div>
          </div>
          <div className="editUserInfoFormSec_propensity">
            <div className="editUserInfoFormSec_propensity_phrase">
              <h1>{this.state.username}님의 성향을 체크해주세요</h1>
              <select onChange={this.userPropensity}>{this.mbtiChecker}</select>
            </div>
          </div>
          <div className="editUserInfoFormSec_mood">
            <div className="editUserInfoFormSec_mood_phrase">
              <h1>{this.state.username}님의 오늘 기분에 대해 알려주세요</h1>
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
              <div className="Stack">{this.stackList}</div>
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
