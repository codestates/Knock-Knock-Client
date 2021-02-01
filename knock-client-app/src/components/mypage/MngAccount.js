/* eslint-disable */
import React from "react";
import axios from "axios";
import "../../styles/history_profile.css";
import "../../styles/mypage.css";
import { mbti } from "../../utils/options";
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
    this.getUserInfoFromProfile = this.getUserInfoFromProfile.bind(this);

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
  }

  storageInfo() {
    let userInfo = {
      username: this.grade,
      persona: this.propensity,
      mood: this.mood,
      user_stacks: `${String(this.stack)}`,
    };
    if (userInfo.username && userInfo.username.split("").includes("기")) {
      axios
        .post("https://localhost:4000/profile", userInfo, {
          withCredentials: true,
        })
        .then((updatedUserInfo) => {
          this.setState({ userInfo: updatedUserInfo.data.data });
          this.props.history.push("/mypage", userInfo);
        });
    } else {
      alert("유저이름을 예시와 동일하게 반드시 입력해주세요");
    }
  }

  retrospectClickHandler() {
    this.props.history.push("/mngHistory");
  }

  getHisfromAccWithProfile() {
    this.props.getHistoryHandler(this.props.history);
  }

  getUserInfoFromProfile(userInfo) {
    this.setState({ userInfo });
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
          getUserInfoFromProfile={this.getUserInfoFromProfile}
        />
        <div className="mypageContainer_editUserInfoFormSec">
          <div className="editUserInfoFormSec_wrap">
            <div className="editUserInfoFormSec_term">
              <div className="editUserInfoFormSec_term_phrase">
                <div className="editUserInfoFormSec_phrase">
                  코드스테이츠의 기수와 이름을 반드시 입력해주세요.
                </div>
                <h5>{`예시) 프리코스일 경우 PRE7기 정코딩 / 이머시브일 경우 IM24기 이코딩`}</h5>
                <input
                  onChange={(e) => this.userGrade(e)}
                  tpye="text"
                  placeholder="여기에 기수를 입력해주세요"
                  className="editUserInfoFormSec_usernameText"
                  value={this.state.userInfo.username}
                />
              </div>
            </div>
            <div className="editUserInfoFormSec_propensity">
              <div className="editUserInfoFormSec_propensity_phrase">
                <div className="editUserInfoFormSec_phrase">
                  회원님의 성향을 체크해주세요
                </div>
                <select
                  onChange={this.userPropensity}
                  className="editUserInfoFormSec_propensitySelect"
                >
                  {this.mbtiChecker}
                </select>
              </div>
            </div>
            <div className="editUserInfoFormSec_mood">
              <div className="editUserInfoFormSec_mood_phrase">
                <div className="editUserInfoFormSec_phrase">
                  {" "}
                  오늘 기분에 대해 알려주세요
                </div>
                <input
                  type="text"
                  onChange={(e) => {
                    this.userMood(e);
                  }}
                  placeholder="오늘 기분을 알려주세요 : )"
                  className="editUserInfoFormSec_moodText"
                  value={this.state.userInfo.mood}
                />
              </div>
            </div>
            <div className="editUserInfoFormSec_stacks_wrap">
              <div className="editUserInfoFormSec_phrase">
                {this.state.userInfo.username}님이 주로 사용하는 스택을
                선택해주세요.
              </div>
              <div className="showStack">
                현재
                <span className="showStack_stacks">
                  {this.state.userStack + ""}
                </span>
                을 선택하셨습니다.
              </div>

              <PrintLogo userStack={this.getStack} />
            </div>
            <div
              className="editUserInfoFormSec_saveBtn"
              onClick={() => this.storageInfo()}
            >
              저장하기
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default MngAccount;
