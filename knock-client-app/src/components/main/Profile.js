import React from "react";

class Profile extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    return (
      <div className="mypageContainer_profileSec">
        <div className="profileSec_profileImg">
          <img
            width="320"
            height="320"
            src="https://cdn.business2community.com/wp-content/uploads/2017/08/blank-profile-picture-973460_640.png"
            alt=""
          />
        </div>
        <div className="profileSec_name_mood">
          <p className="profileSec_username">
            {this.props.userInfo ? this.props.userInfo.userGrade : ""}
          </p>
          <p className="profileSec_mood">
            {this.props.userInfo ? this.props.userInfo.userMood : ""}
          </p>
        </div>
        <div className="profileSec_btns">
          {this.props.isMypage ? (
            <button
              className="profileSec_btns_mypage"
              onClick={() => this.props.mypageClickHandler()}
            >
              마이페이지
            </button>
          ) : (
            <button className="profileSec_btns_false">
              &gt;마이페이지&lt;
            </button>
          )}

          <button className="profileSec_btns_historyMng">히스토리</button>
          {this.props.isAccountMng ? (
            <button
              className="profileSec_btns_accountMng"
              onClick={() => this.props.accountMngClickHandler()}
            >
              계정 관리
            </button>
          ) : (
            <button className="profileSec_btns_false">&gt;계정관리&lt;</button>
          )}
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
    );
  }
}

export default Profile;
