import React from "react";
import axios from "axios";

class Profile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userInfo: {},
    };

    console.log("this.props.userInfo = ", this.props);
  }

  async componentDidMount() {
    // 사용자 ID 부분 수정해야함!!!!!!!!!
    // 세션 해결 후 수정!!!!!!!
    // const userInfo = await axios.get(`https://localhost:4000/profile/1`);
    // this.setState({
    //   userInfo: userInfo.data.userData,
    // });
    // console.log(userInfo);

    const url = new URL(window.location.href);
    const authorizationCode = url.searchParams.get("code");

    if (authorizationCode) {
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

    // 나중에 수정 해야함(사용자 정보 변경 요청 주소 바뀔 경우)
    const userInfo = await axios.post(
      "https://localhost:4000/profile",
      {},
      { withCredentials: true }
    );

    this.setState({ userInfo: userInfo.data.data });
  }

  render() {
    return (
      <div className="mypageContainer_profileSec">
        <div className="profileSec_profileImg">{/* 프로필 사진 이미지 */}</div>
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
        </div>
      </div>
    );
  }
}

export default Profile;
