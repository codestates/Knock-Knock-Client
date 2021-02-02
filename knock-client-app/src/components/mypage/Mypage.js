import React from "react";
import axios from "axios";
import "../../styles/mypage.css";

import Profile from "./Profile";

class Mypage extends React.Component {
  constructor(props) {
    super(props);

    this.accountMngClickHandler = this.accountMngClickHandler.bind(this);
    this.retrospectClickHandler = this.retrospectClickHandler.bind(this);
    this.getHisfromAccWithProfile = this.getHisfromAccWithProfile.bind(this);

    this.state = {
      isAccountMng: true,
      isMypage: false,
      userPosts: [],
      openPosts: [],
      closedPosts: [],
    };
  }

  async componentDidMount() {
    const userInfo = await axios.get("https://localhost:4000/profile", {
      withCredentials: true,
    });

    this.setState({
      userPosts: userInfo.data.postdata,
    });
  }

  accountMngClickHandler() {
    this.props.history.push("/mngAccount");
    this.setState({ isAccountMng: false });
  }

  retrospectClickHandler() {
    this.props.history.push("/mngHistory", { isMypage: true });
  }

  getHisfromAccWithProfile() {
    this.props.getHistoryHandler(this.props.history);
  }

  render() {
    let openPosts = [];
    let closedPosts = [];

    this.state.userPosts.forEach((post) => {
      if (post.open) {
        openPosts.push(post);
      } else {
        closedPosts.push(post);
      }
    });

    return (
      <div className="mypageContainer">
        <div className="mypageContainer_blankSec"></div>
        <Profile
          isAccountMng={this.state.isAccountMng}
          isMypage={this.state.isMypage}
          accountMngClickHandler={this.accountMngClickHandler}
          retrospectClickHandler={this.retrospectClickHandler}
          modalLoginHandler={this.props.modalLoginHandler}
          getHisfromAccWithProfile={this.getHisfromAccWithProfile}
        />
        <div className="mypageContainer_boardListSec">
          <div className="boardListSec_openboardWrap">
            <div className="openboardWrap_title">
              <h1>열린 게시물</h1>
            </div>
            <div className="openboardWrap_boardList">
              {openPosts.map((post, idx) => {
                return (
                  <div key={idx} className="boardList_openboard">
                    <div className="boardList_openboard_brief">
                      <h1>{post.title}</h1>

                      <h2>OPEN</h2>
                    </div>
                    <div className="boardList_openboard_detail">
                      <p dangerouslySetInnerHTML={{ __html: post.content }}></p>
                      {post.post_stacks ? (
                        <p>스택 : {post.post_stacks}</p>
                      ) : (
                        <p>스택 : 스택 없음</p>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
          <div className="boardListSec_closeboardWrap">
            <div className="closeboardWrap_title">
              <h1>닫힌 게시물</h1>
            </div>
            <div className="closeboardWrap_boardList">
              {closedPosts.map((post, idx) => {
                return (
                  <div key={idx} className="boardList_closeboard">
                    <div className="boardList_closeboard_brief">
                      <h1>{post.title}</h1>

                      <h2>CLOSED</h2>
                    </div>
                    <div className="boardList_closeboard_detail">
                      <p dangerouslySetInnerHTML={{ __html: post.content }}></p>

                      {post.post_stacks ? (
                        <p>스택 : {post.post_stacks}</p>
                      ) : (
                        <p>스택 없음</p>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Mypage;
