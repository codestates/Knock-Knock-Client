import React, { Component } from "react";
import ProfileEdit from "./ProfileEditForm";
import "../../styles/history.css";
import "../../styles/mypage.css";
import SendRetrospect from "./retrospect";
const axios = require("axios");

class MngHistory extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isClick: false,
      journals: [],
      userPosts: [],
    };
    this.journals = [];
    this.retrospect = "";

    this.registerJouranl = this.registerJouranl.bind(this);
    this.keepJournal = this.keepJournal.bind(this);
    this.dangerBtn = this.dangerBtn.bind(this);
  }

  async componentDidMount() {
    // 사용자 ID 부분 수정해야함!!!!!!!!!
    const userInfo = await axios.get("https://localhost:4000/profile/1", {
      withCredentials: true,
    });
    this.setState({
      userPosts: userInfo.data.postData,
    });
    /*==========================================================================*/
    // axios
    //   .post("https://localhost:4000/profile", {}, { withCredentials: true })
    //   .then((userInfo) => {
    //     console.log("드디어!! 히스토리!!  = ", userInfo);
    //   });
    /*=========================================================================*/
  }

  keepJournal(value) {
    this.retrospect = value.target.value;
  }

  registerJouranl() {
    let date = new Date().toLocaleDateString().split("/");
    let [day, month] = [date[0], date[1]];
    date[0] = month;
    date[1] = day;
    let register_At = date.reverse();
    let regiJournal = {
      username: "IM24 이준희",
      date: register_At.join("-"),
      retrospect: this.retrospect,
    };
    this.journals.unshift(regiJournal);
    return this.setState({ journals: this.journals });
  }

  dangerBtn() {
    axios({
      method: "delete",
      url: "/deletePost",
      WithCredentials: true,
      headers: { "content-Type": "application/json" },
      body: JSON.stringify({ roomId: "몰라요", userId: "이것도몰라요" }),
    });
  }

  render() {
    console.log(this.state.userPosts);
    return (
      <div className="mypageContainer">
        <div className="mypageContainer_blankSec"></div>
        <ProfileEdit userPosts={this.state.userPosts} />

        <div className="mypageContainer_editUserInfoFormSec">
          <p>{}</p>
          <button
            onClick={() => {
              this.dangerBtn();
            }}
            className="DangerBtn"
          >
            레포삭제
          </button>
          <div className="His_submitForm">
            <textarea
              className="Journal_box"
              placeholder="Why not to keep a journal about what you did!!!??"
              onChange={(e) => this.keepJournal(e)}
            />

            <div className="His_submit">
              <button onClick={() => this.registerJouranl()}>
                <p className="His_submit_p">등록</p>
              </button>
            </div>
          </div>
          <ul className="Retro_list">
            <SendRetrospect value={this.state.journals} />
          </ul>
        </div>
      </div>
    );
  }
}

export default MngHistory;
