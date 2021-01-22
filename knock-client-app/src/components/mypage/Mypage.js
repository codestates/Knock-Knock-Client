import React from "react";
import axios from "axios";
import "../../styles/mypage.css";
import Profile from "./Profile";

class Mypage extends React.Component {
  constructor(props) {
    super(props);
    this.accountMngClickHandler = this.accountMngClickHandler.bind(this);
    this.retrospectClickHandler = this.retrospectClickHandler.bind(this);

    this.state = {
      isAccountMng: true,
      isMypage: false,
      userPosts: [],
      openPosts: [],
      closedPosts: [],
    };
  }

  async componentDidMount() {
    // 사용자 ID 부분 수정해야함!!!!!!!!!
    const userInfo = await axios.get("https://localhost:4000/profile/1", {
      withCredentials: true,
    });

    this.setState({
      userPosts: userInfo.data.postData,
    });
  }

  accountMngClickHandler() {
    this.props.history.push("/mngAccount");
    this.setState({ isAccountMng: false });
  }

  retrospectClickHandler() {
    this.props.history.push("/mngHistory");
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
        />
        <div className="mypageContainer_boardListSec">
          <div className="boardListSec_openboardWrap">
            <div className="openboardWrap_title">
              <h1>열린 게시물</h1>
            </div>
            <div className="openboardWrap_boardList">
              {openPosts.map((post) => {
                return (
                  <div className="boardList_openboard">
                    <div className="boardList_openboard_brief">
                      <h1>{post.title}</h1>
                      <h2>인원 : {post.total}</h2>
                      {/* 사용자 포지션 들어가야함!!!!!!! */}
                      <h2>진행중</h2>
                    </div>
                    <div className="boardList_openboard_detail">
                      <div className="openboard_detail_title_writer">
                        <h2>그룹장: {post.writer}</h2>
                      </div>
                      <p>{post.content}</p>
                      <p>스택 : {post.post_stacks}</p>
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
              {closedPosts.map((post) => {
                return (
                  <div className="boardList_openboard">
                    <div className="boardList_openboard_brief">
                      <h1>{post.title}</h1>
                      <h2>인원 : {post.total}</h2>
                      {/* 사용자 포지션 들어가야함!!!!!!! */}
                      <h2>종료</h2>
                    </div>
                    <div className="boardList_openboard_detail">
                      <div className="openboard_detail_title_writer">
                        <h2>그룹장: {post.writer}</h2>
                      </div>
                      <p>{post.content}</p>
                      <p>스택 : {post.post_stacks}</p>
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
