import React from "react";
import axios from "axios";
import "../../styles/mypage.css";

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

    this.state = {
      username: "jnoodle",
      isMypage: true,
      userInfo: [],
    };
    this.grade = "";
    this.propensity = [];
    this.mood = "";
    this.stack = [];
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
    if (value.target.checked) {
      this.propensity.push(value.target.value);
    } else {
      this.propensity.splice(this.propensity.indexOf(value.target.value), 1);
    }

    console.log(this.propensity);
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
      userGrade: this.grade,
      propensity: this.propensity,
      userMood: this.mood,
      userStack: this.stack,
    };

    this.props.history.push("/mypage", userInfo);
  }

  render() {
    console.log(this.state.userInfo);
    return (
      <div className="mypageContainer">
        <div className="mypageContainer_blankSec"></div>
        <Profile
          isMypage={this.state.isMypage}
          mypageClickHandler={this.mypageClickHandler}
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
              <input
                onChange={(e) => {
                  this.userPropensity(e);
                }}
                type="checkbox"
                value="소심한"
                className="propensity_checker"
              ></input>
              <label htmlFor="소극적">소심한</label>
              <input
                onChange={(e) => {
                  this.userPropensity(e);
                }}
                type="checkbox"
                value="적극적"
                className="propensity_checker"
              ></input>
              <label htmlFor="적극적">적극적</label>
              <input
                onChange={(e) => {
                  this.userPropensity(e);
                }}
                type="checkbox"
                value="냉소적"
                className="propensity_checker"
              ></input>
              <label htmlFor="냉소적">냉소적</label>
              <input
                onChange={(e) => {
                  this.userPropensity(e);
                }}
                type="checkbox"
                value="계획적"
                className="propensity_checker"
              ></input>
              <label htmlFor="계획적">계획적</label>
              <input
                onChange={(e) => {
                  this.userPropensity(e);
                }}
                type="checkbox"
                value="랑랑한"
                className="propensity_checker"
              ></input>
              <label htmlFor="랑랑한">랑랑한</label>
              <input
                onChange={(e) => {
                  this.userPropensity(e);
                }}
                type="checkbox"
                value="완벽한"
                className="propensity_checker"
              ></input>
              <label htmlFor="완벽한">완벽한</label>
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

              <input
                onChange={(e) => {
                  this.userStack(e);
                }}
                type="checkbox"
                value="Javascript"
                className="userStack"
              ></input>
              <label htmlFor="Javascript">Javascript</label>

              <input
                onChange={(e) => {
                  this.userStack(e);
                }}
                type="checkbox"
                value="Python"
                className="userStack"
              ></input>
              <label htmlFor="Python">Python</label>

              <input
                onChange={(e) => {
                  this.userStack(e);
                }}
                type="checkbox"
                value="React"
                className="userStack"
              ></input>
              <label htmlFor="React">React</label>
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
