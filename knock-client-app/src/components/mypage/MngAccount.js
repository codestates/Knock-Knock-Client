import React from "react";
import axios from "axios";
import "../../styles/mypage.css";
import { mbti } from "../../utils/options";
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
    this.authorizationCode = window.location.href
      .split("code=")[1]
      .split("&")[0];

    this.mbtiChecker = mbti.map((el, idx) => {
      return (
        <option key={idx} value={el}>
          {el}
        </option>
      );
    });
  }

  componentDidMount() {
    // axios.post("http://localhost:4000/oauth", {
    //   oauth: "google",
    //   authorizationCode: this.authorizationCode,
    // });
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
              <select>{this.mbtiChecker}</select>
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
