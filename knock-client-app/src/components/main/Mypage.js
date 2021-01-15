import React from "react";
import axios from "axios";
import "../../styles/mypage.css";

class Mypage extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="mypageContainer">
        <div className="mypageContainer_blankSec"></div>
        <div className="mypageContainer_profileSec">
          <div className="profileSec_profileImg">
            <img
              width="200"
              height="200"
              src="https://cdn.business2community.com/wp-content/uploads/2017/08/blank-profile-picture-973460_640.png"
              alt=""
            />
          </div>
          <div className="profileSec_name_mood">
            <p className="profileSec_username">정인수</p>
            <p className="profileSec_mood">으악!</p>
          </div>
          <div className="profileSec_btns">
            <button className="profileSec_btns_accountMng">계정 관리</button>
            <button className="profileSec_btns_projectMng">
              프로젝트 관리
            </button>
          </div>
          <div className="profileSec_stacks">
            <img
              width="50"
              height="50"
              src="https://cdn.business2community.com/wp-content/uploads/2017/08/blank-profile-picture-973460_640.png"
              alt=""
            />
            <img
              width="50"
              height="50"
              src="https://cdn.business2community.com/wp-content/uploads/2017/08/blank-profile-picture-973460_640.png"
              alt=""
            />
            <img
              width="50"
              height="50"
              src="https://cdn.business2community.com/wp-content/uploads/2017/08/blank-profile-picture-973460_640.png"
              alt=""
            />
          </div>
        </div>
        <div className="mypageContainer_boardListSec">
          <div className="boardListSec_openboardWrap">
            <div className="openboardWrap_title"></div>
            <div className="openboardWrap_boardList">
              <div className="boardList_openboard"></div>
              <div className="boardList_openboard"></div>
              <div className="boardList_openboard"></div>
            </div>
          </div>
          <div className="boardListSec_closeboardWrap">
            <div className="closeboardWrap_title"></div>
            <div className="closeboardWrap_boardList">
              <div className="boardList_closeboard"></div>
              <div className="boardList_closeboard"></div>
              <div className="boardList_closeboard"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Mypage;
