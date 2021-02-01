/* eslint-disable */
import React, { Component } from "react";
import ProfileEdit from "./MngHistoryProfile";
import "../../styles/history.css";
import "../../styles/mypage.css";
import SendRetrospect from "./Retrospect";
import axios from "axios";
import emailjs from "emailjs-com";

class MngHistory extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isClick: false,
      journals: [],
      userData: {},
      userPosts: [],
      selectOneHisInfo: {},
      currentPostId: "",
      isRetroListAndInput: false,
    };
    this.retrospect = "";

    this.registerJouranl = this.registerJouranl.bind(this);
    this.keepJournal = this.keepJournal.bind(this);
    this.dangerBtn = this.dangerBtn.bind(this);
    this.boardRetroHandler = this.boardRetroHandler.bind(this);
    this.mypageHandleFromHisPro = this.mypageHandleFromHisPro.bind(this);
    this.retroDeleteHandler = this.retroDeleteHandler.bind(this);
    this.sendEmailForRetroHandler = this.sendEmailForRetroHandler.bind(this);
    this.mngAccountHandleFromHisPro = this.mngAccountHandleFromHisPro.bind(
      this
    );
  }

  async componentDidMount() {
    // 네비게이션 모달 로그아웃을 위한 히스토리 객체 전달
    this.props.getHistoryHandler(this.props.history);

    const userInfo = await axios.get("https://localhost:4000/profile", {
      withCredentials: true,
    });

    userInfo.data.postdata.sort((a, b) => {
      return new Date(b.created_at) - new Date(a.created_at);
    });
    this.setState({
      userData: userInfo.data.userdata,
      userPosts: userInfo.data.postdata,
    });
  }

  async boardRetroHandler(retroNum) {
    const retros = await axios.get(`https://localhost:4000/diary/${retroNum}`, {
      withCredentials: true,
    });

    let selectOneHisInfo;
    this.state.userPosts.forEach((post) => {
      if (post.id === Number(retroNum)) {
        selectOneHisInfo = post;
      }
    });

    if (selectOneHisInfo.category === "Question") {
      this.props.history.push("/roominfo", selectOneHisInfo);
    }

    retros.data.data.sort((a, b) => {
      return new Date(b.created_at) - new Date(a.created_at);
    });

    this.setState({
      isRetroListAndInput: true,
      selectOneHisInfo,
      journals: retros.data.data,
      currentPostId: retroNum,
    });
  }

  mypageHandleFromHisPro() {
    this.props.history.push("/mypage");
  }

  mngAccountHandleFromHisPro() {
    this.props.history.push("/mngAccount");
  }

  keepJournal(value) {
    this.retrospect = value.target.value;
  }

  registerJouranl() {
    let regiJournal = {
      postid: this.state.selectOneHisInfo.id,
      content: this.retrospect,
    };
    axios
      .post("https://localhost:4000/diary", regiJournal, {
        withCredentials: true,
      })
      .then((regiJournal) => {
        regiJournal.data.data.sort((a, b) => {
          return new Date(b.created_at) - new Date(a.created_at);
        });
        this.setState({ journals: regiJournal.data.data });
      });
  }

  retroDeleteHandler(delRetroId) {
    axios
      .delete("https://localhost:4000/diary", {
        data: {
          diaryid: delRetroId,
          postid: this.state.selectOneHisInfo.id,
        },
        withCredentials: true,
      })
      .then((afterDelJournals) => {
        afterDelJournals.data.data.sort((a, b) => {
          return new Date(b.created_at) - new Date(a.created_at);
        });
        this.setState({ journals: afterDelJournals.data.data });
      });
  }

  dangerBtn() {
    if (window.confirm("참여된 게시물을 삭제하시겠습니까?")) {
      axios
        .delete(`https://localhost:4000/posts`, {
          data: {
            postid: this.state.currentPostId,
          },
          withCredentials: true,
        })
        .then((posts) => {
          alert("참여한 게시물을 삭제하였습니다!");

          posts.data.data.sort(
            (a, b) => new Date(b.created_at) - new Date(a.created_at)
          );
          this.setState({
            userPosts: posts.data.data,
            isRetroListAndInput: false,
            journals: [],
          });
        });
    }
  }

  sendEmailForRetroHandler() {
    const toEmail = window.prompt("회고 기록을 받을 이메일을 작성해주세요.");

    if (window.confirm("회고 기록을 이메일로 보내시겠습니까?")) {
      let sendEmailStr = "";

      this.state.journals.forEach((journal) => {
        for (let key in journal) {
          if (key === "created_at") {
            sendEmailStr += `작성일: ${journal.created_at.split("T")[0]} \n`;
          }
          if (key === "content") {
            sendEmailStr += `내용: ${journal.content} \n`;
          }
        }
        sendEmailStr += "\n";
      });

      emailjs
        .send(
          "service_3hy8xhq",
          "template_4xcepjp",
          {
            to_email: toEmail,
            to_name: this.state.userData.username,
            from_name: "KnockKnock",
            post_title: this.state.selectOneHisInfo.title,
            message: sendEmailStr.replace(/(?:\r\n|\r|\n)/g, "<br/>"),
          },
          "user_i7cqOYLkPzGQWTE60qCvw"
        )
        .then((result) => {});
    }
  }

  render() {
    return (
      <div className="mypageContainer">
        <div className="mypageContainer_blankSec"></div>
        <ProfileEdit
          userPosts={this.state.userPosts}
          boardRetroHandler={this.boardRetroHandler}
          mypageHandleFromHisPro={this.mypageHandleFromHisPro}
          mngAccountHandleFromHisPro={this.mngAccountHandleFromHisPro}
          breadcrumbHandler={this.props.location}
        />

        <div className="mypageContainer_editUserInfoFormSec">
          {this.state.isRetroListAndInput ? (
            <>
              <div className="HisInfo_header">
                <h1>{this.state.selectOneHisInfo.title}</h1>
                <h3>회고를 작성하는 공간입니다.</h3>
              </div>
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
                <SendRetrospect
                  journals={this.state.journals}
                  userData={this.state.userData}
                  retroDeleteHandler={this.retroDeleteHandler}
                />
              </ul>

              <div className="His_delete_and_email_btns">
                <button
                  onClick={() => {
                    this.dangerBtn();
                  }}
                  className="DangerBtn"
                >
                  레포삭제
                </button>
                <button
                  onClick={this.sendEmailForRetroHandler}
                  className="HisList_sendBtn"
                >
                  메일로 보내기
                </button>
              </div>
            </>
          ) : (
            <></>
          )}
        </div>
      </div>
    );
  }
}

export default MngHistory;
