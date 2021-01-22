import React from "react";
import axios from "axios";
import PrintLogo from "./PrintStackLogo"; // lines number of 101 to 104

class Profile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userInfo: {},
    };

    console.log("this.props.userInfo = ", this.props);
  }

  async componentDidMount() {
    const url = new URL(window.location.href);
    const authorizationCode = url.searchParams.get("code");

    if (authorizationCode) {
      axios
        .post(
          "https://localhost:4000/oauth",
          {
            authorizationCode: authorizationCode,
          },
          { withCredentials: true }
        )
        .then(async (oauthUserInfo) => {
          axios.get(
            `https://localhost:4000/profile/${oauthUserInfo.data.data.id}`,
            {
              withCredentials: true,
            }
          );
        });
    }
  }

  render() {
    console.log("하하하하", this.state.userInfo);
    return (
      <div className="mypageContainer_profileSec">
        <div className="profileSec_profileImg">
          {/* 프로필 사진 이미지 [이준희]*/}
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
            <button className="profileSec_btns_false">마이페이지</button>
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
            <button className="profileSec_btns_false">계정관리</button>
          )}
        </div>
        <div className="profileSec_stacks">
          {/* 밑에 있는 로직은 로고를 이미지로 보여주기 위한 컴포넌트 [PrintStackLogo.js]구상중 */}
          {/* <PrintLogo
            Logo={this.state.userInfo ? this.state.userInfo.user_stacks : ""}
          /> */}
          <div>
            {this.state.userInfo ? this.state.userInfo.user_stacks : ""}
          </div>
        </div>
      </div>
    );
  }
}

export default Profile;
