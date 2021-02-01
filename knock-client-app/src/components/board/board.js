/* eslint-disable */
import React, { useEffect, useState } from "react";
import "../../styles/board.css";
import together from "../../images/boardImg/together.jpg";
import question from "../../images/boardImg/Question.jpg";
import study from "../../images/boardImg/studyGroup.jpg";
import axios from "axios";

const PublicBoard = (props) => {
  const [posts, setPosts] = useState([]);
  const [postFilter, setPostFilter] = useState("");

  useEffect(async () => {
    // 네비게이션 모달 로그아웃을 위한 히스토리 객체 전달
    props.getHistoryHandler(props.history);

    let postsList;

    if (props.location.state) {
      if (!postFilter) {
        const {
          boardType,
          boardPeopleNum,
          boardSearchText,
        } = props.location.state;
        // 모든 값을 필터에 넣었을 때
        postsList = await axios.get(
          `https://localhost:4000/search?category=${boardType}&total=${boardPeopleNum}&title=${boardSearchText}`,
          { withCredentials: true }
        );
      } else {
        if (postFilter && postFilter !== "All") {
          postsList = await axios.get(
            `https://localhost:4000/search?category=${postFilter}&total=&title=`,
            { withCredentials: true }
          );
        } else {
          // 필터값에 아무것도 안넣었을 때
          postsList = await axios.get(
            `https://localhost:4000/search?category=&total=&title=`,
            { withCredentials: true }
          );
        }
      }
    } else {
      // 카테고리만 필터에 넣었을 때
      if (postFilter && postFilter !== "All") {
        postsList = await axios.get(
          `https://localhost:4000/search?category=${postFilter}&total=&title=`,
          { withCredentials: true }
        );
      } else {
        // 필터값에 아무것도 안넣었을 때
        postsList = await axios.get(
          `https://localhost:4000/search?category=&total=&title=`,
          { withCredentials: true }
        );
      }
    }

    // 전체 게시물을 보여주기 postsList 값 가공
    let postsArr = [];
    postsList.data.data.forEach((post) => {
      let postObj = {
        id: post.id,
        writer: post.writer,
        category: post.category,
        title: post.title,
        content: post.content,
        post_stacks: post.post_stacks,
        total: post.total,
        open: post.open,
        frontend: post.frontend,
        backend: post.backend,
        created_at: post.created_at,
        updated_at: post.updated_at,
      };

      postsArr.push(postObj);
    });

    postsArr.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));

    setPosts(postsArr);
  }, [props.location.state, postFilter]);

  const roomCardClickHandler = async (event) => {
    const postId = event.nativeEvent.path[0].attributes.value.value;
    if (window.localStorage.getItem("isLogin")) {
      const userInfo = await axios.get("https://localhost:4000/profile", {
        withCredentials: true,
      });

      const userInvolved = [];
      userInfo.data.postdata.filter((el) => {
        userInvolved.push(el.id);
      });

      for (let post of posts) {
        if (post.id === Number(postId)) {
          if (userInvolved.indexOf(post.id) !== -1) {
            props.history.push("/roomInfo", {
              ...post,
              userInvolved: true,
            });
          } else {
            props.history.push("/roomInfo", {
              ...post,
              userInvolved: false,
              username: userInfo.data.userdata.username,
            });
          }
        }
      }
    } else {
      for (let post of posts) {
        if (post.id === Number(postId)) {
          props.history.push("/roomInfo", {
            ...post,
            userInvolved: false,
          });
        }
      }
    }
  };

  const postFilterHandler = (event) => {
    setPostFilter(event.target.attributes[1].value);
  };

  return (
    <div className="B_container">
      <div className="B_flexbox-container">
        <nav className="B_SideBarSec">
          <ul>
            <li className="B_filterBtn" value="All" onClick={postFilterHandler}>
              ALL
            </li>
            <li
              className="B_filterBtn"
              value="Study"
              onClick={postFilterHandler}
            >
              Study
            </li>
            <li
              className="B_filterBtn"
              value="Project"
              onClick={postFilterHandler}
            >
              Project
            </li>
            <li
              className="B_filterBtn"
              value="Question"
              onClick={postFilterHandler}
            >
              Q{"&"}A
            </li>

            {window.localStorage.getItem("isLogin") ? (
              <li
                className="B_filterBtn"
                onClick={() => props.history.push("/createRoom")}
              >
                그룹만들기
              </li>
            ) : (
              <></>
            )}
          </ul>
        </nav>
        <div className="B_RoomContaniner">
          {posts.map((post, idx) => {
            if (post.open) {
              if (post.category === "Project") {
                return (
                  <div
                    className="B_RoomCard"
                    value={post.id}
                    key={idx}
                    onClick={roomCardClickHandler}
                  >
                    <div className="B_RoomCard-Status" value={post.id}>
                      OPEN
                    </div>
                    <img
                      src={together}
                      className="B_RoomCard-image"
                      value={post.id}
                    />

                    <div className="B_RommCard-info" value={post.id}>
                      <div className="B_RoomCard-category" value={post.id}>
                        {post.category}
                      </div>
                      <div className="B_RoomCard-title" value={post.id}>
                        {post.title.length >= 23
                          ? post.title.substr(0, 23) + "..."
                          : post.title}
                      </div>
                    </div>
                    <div
                      className="B_RoomCard-writer-createdAt"
                      value={post.id}
                    >
                      <div className="B_RoomCard-writer" value={post.id}>
                        {post.writer}
                      </div>
                      <div className="B_RoomCard-createdAt" value={post.id}>
                        {post.created_at.split("T")[0]}
                      </div>
                    </div>
                  </div>
                );
              }
              if (post.category === "Study") {
                return (
                  <div
                    key={idx}
                    className="B_RoomCard"
                    value={post.id}
                    onClick={roomCardClickHandler}
                  >
                    <div className="B_RoomCard-Status" value={post.id}>
                      OPEN
                    </div>
                    <img
                      src={study}
                      className="B_RoomCard-image"
                      value={post.id}
                    />
                    <div className="B_RommCard-info" value={post.id}>
                      <div className="B_RoomCard-category" value={post.id}>
                        {post.category}
                      </div>
                      <div className="B_RoomCard-title" value={post.id}>
                        {post.title.length >= 23
                          ? post.title.substr(0, 23) + "..."
                          : post.title}
                      </div>
                    </div>

                    <div
                      className="B_RoomCard-writer-createdAt"
                      value={post.id}
                    >
                      <div className="B_RoomCard-writer" value={post.id}>
                        {post.writer}
                      </div>
                      <div className="B_RoomCard-createdAt" value={post.id}>
                        {post.created_at.split("T")[0]}
                      </div>
                    </div>
                  </div>
                );
              }
            }
            if (post.category === "Question") {
              return (
                <div
                  key={idx}
                  className="B_RoomCard"
                  value={post.id}
                  onClick={roomCardClickHandler}
                >
                  <div className="B_RoomCard-Status" value={post.id}>
                    {post.open ? "OPEN" : "CLOSED"}
                  </div>
                  <img
                    src={question}
                    className="B_RoomCard-image"
                    value={post.id}
                  />
                  <div className="B_RommCard-info" value={post.id}>
                    <div className="B_RoomCard-category" value={post.id}>
                      {post.category}
                    </div>
                    <div className="B_RoomCard-title" value={post.id}>
                      {post.title.length >= 23
                        ? post.title.substr(0, 23) + "..."
                        : post.title}
                    </div>
                  </div>
                  <div className="B_RoomCard-writer-createdAt" value={post.id}>
                    <div className="B_RoomCard-writer" value={post.id}>
                      {"Question"}
                    </div>
                    <div className="B_RoomCard-createdAt" value={post.id}>
                      {post.created_at.split("T")[0]}
                    </div>
                  </div>
                </div>
              );
            } else {
              return <></>;
            }
          })}
          {/* !!!!!!!!!!!다른 카테고리의 게시물들 수정해야됨!!!!!!!!! */}
        </div>
      </div>
    </div>
  );
};

export default PublicBoard;
