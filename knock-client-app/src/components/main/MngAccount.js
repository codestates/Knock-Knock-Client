import React from "react";
import axios from "axios";
import "../../styles/mypage.css";

import Profile from "./Profile";

class MngAccount extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      username: "jnoodle",
    };
  }

  render() {
    return (
      <div className="mypageContainer">
        <div className="mypageContainer_blankSec"></div>
        <Profile />
        <div className="mypageContainer_editUserInfoFormSec">
          <div className="editUserInfoFormSec_term">
            <div className="editUserInfoFormSec_term_phrase">
              <h1>{this.state.username}님의 기수를 선택해주세요</h1>
            </div>
          </div>
          <div className="editUserInfoFormSec_propensity">
            <div className="editUserInfoFormSec_propensity_phrase">
              <h1>{this.state.username}님의 성향을 체크해주세요</h1>
            </div>
          </div>
          <div className="editUserInfoFormSec_mood">
            <div className="editUserInfoFormSec_mood_phrase">
              <h1>{this.state.username}님의 오늘 기분에 대해 알려주세요</h1>
            </div>
          </div>
          <div className="editUserInfoFormSec_saveBtn">
            <button>저장</button>
          </div>
        </div>
      </div>
    );
  }
}

export default MngAccount;
