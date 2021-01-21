import React from "react";
import axios from "axios";

class Profile extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      userInfo: {},
    };
  }

  async componentDidMount() {
    // 사용자 ID 부분 수정해야함!!!!!!!!!
    const userInfo = await axios.get("https://localhost:4000/profile/1", {
      withCredentials: true,
    });
    this.setState({
      userInfo: userInfo.data.userData,
    });
    console.log(userInfo);
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
            {this.state.userInfo ? this.state.userInfo.username : ""}
          </p>
          <p className="profileSec_mood">
            {this.state.userInfo ? this.state.userInfo.mood : ""}
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

          <button
            className="profileSec_btns_historyMng"
            onClick={() => this.props.retrospectClickHandler()}
          >
            히스토리
          </button>
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
          {/* 
            사용자 스택 보여줘야함
          */}
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
