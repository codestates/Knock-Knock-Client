/* eslint-disable */
import React, { Component } from "react";
import ProfileEdit from "./MngHistoryProfile";
import "../../styles/history.css";
import "../../styles/mypage.css";
import SendRetrospect from "./Retrospect";
import axios from "axios";

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
  }

  async componentDidMount() {
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
    /*==========================================================================*/
    // axios
    //   .post("https://localhost:4000/profile", {}, { withCredentials: true })
    //   .then((userInfo) => {
    //     console.log("드디어!! 히스토리!!  = ", userInfo);
    //   });
    /*=========================================================================*/
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

  render() {
    return (
      <div className="mypageContainer">
        <div className="mypageContainer_blankSec"></div>
        <ProfileEdit
          userPosts={this.state.userPosts}
          boardRetroHandler={this.boardRetroHandler}
          mypageHandleFromHisPro={this.mypageHandleFromHisPro}
        />

        <div className="mypageContainer_editUserInfoFormSec">
          <p>{}</p>
          {this.state.isRetroListAndInput ? (
            <button
              onClick={() => {
                this.dangerBtn();
              }}
              className="DangerBtn"
            >
              레포삭제
            </button>
          ) : (
            <></>
          )}

          {this.state.isRetroListAndInput ? (
            <>
              <h1>{this.state.selectOneHisInfo.title}</h1>
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
