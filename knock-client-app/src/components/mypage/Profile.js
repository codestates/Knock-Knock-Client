/* eslint-disable */
import React from "react";
import axios from "axios";
import { logoImg } from "../../utils/options";
import profileImg from "../../images/profile/profile.png";

class Profile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userInfo: {},
    };
  }

  async componentDidMount() {
    // 최초 O-auth로그인 후 사용자에 대한 세션발급 요청
    const url = new URL(window.location.href);
    const authorizationCode = url.searchParams.get("code");
    if (authorizationCode && !window.localStorage.getItem("isLogin")) {
      await axios
        .post(
          "https://localhost:4000/oauth",
          {
            authorizationCode: authorizationCode,
          },
          { withCredentials: true }
        )
        .then(async (oauthUserInfo) => {
          await axios.get(
            `https://localhost:4000/profile/${oauthUserInfo.data.data.id}`,
            {
              withCredentials: true,
            }
          );
        });
    }
    await axios
      .get("https://localhost:4000/profile", {
        withCredentials: true,
      })
      .then((userInfo) => {
        this.setState({ userInfo: userInfo.data.userdata });
        if (this.props.getUserInfoFromProfile) {
          this.props.getUserInfoFromProfile(userInfo.data.userdata);
        }

        //서버에서 사용자 정보를 가져오면서 로컬스토리지에 사용자 정보가 들어간다.
        window.localStorage.setItem("userid", userInfo.data.userdata.id);
        window.localStorage.setItem(
          "username",
          userInfo.data.userdata.username
        );
        window.localStorage.setItem("isLogin", true);
        //히스토리와 App.js -> mngAccount -> profile
        this.props.modalLoginHandler();
        this.props.getHisfromAccWithProfile();
      });
    // .then((value) => {
  }

  render() {
    return (
      <div className="mypageContainer_profileSec">
        <div className="profileSec_profileImg">
          <img src={profileImg} className="profileImg" />
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
        </div>
        <div className="profileSec_stacks">
          {this.state.userInfo.user_stacks ? (
            this.state.userInfo.user_stacks.split(",").map((stack) => {
              for (let key in logoImg) {
                if (stack === key) {
                  return (
                    <img className="profileSec_stack" src={logoImg[key]} />
                  );
                }
              }
            })
          ) : (
            <></>
          )}
        </div>
      </div>
    );
  }
}

export default Profile;
