/* eslint-disable */
import React, { useEffect, useState } from "react";
import "../../styles/board.css";
import together from "../../images/boardImg/together.png";
import question from "../../images/boardImg/Question.png";
import study from "../../images/boardImg/studyGroup.png";
import axios from "axios";

const PublicBoard = (props) => {
  const [posts, setPosts] = useState([]);
  const [postFilter, setPostFilter] = useState("");

  useEffect(async () => {
    let postsList;

    if (props.location.state) {
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
        total: post.total,
        open: post.open,
        frontend: post.frontend,
        backend: post.backend,
        created_at: post.created_at,
        updated_at: post.updated_at,
      };

      // 스택 가공 코드 수정 해야함 [이준희]
      if (post.post_stacks) {
        postObj.post_stacks = post.post_stacks.split(",");
      }

      postsArr.push(postObj);
    });

    postsArr.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));

    setPosts(postsArr);
  }, [props.location.state, postFilter]);

  const roomCardClickHandler = async (event) => {
    const postId = event.nativeEvent.path[0].attributes.value.value;
    for (let post of posts) {
      if (post.id === Number(postId)) {
        props.history.push("/roomInfo", post);
      }
    }
  };

  const postFilterHandler = (event) => {
    setPostFilter(event.target.attributes[1].value);
  };

  return (
    <div className="B_container">
      {/* <header className="B_header"></header> */}
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
          {/* !!!!!!!!!!!다른 카테고리의 게시물들 수정해야됨!!!!!!!!! / 컴포넌트화 [이준희] */}

          {posts.map((post, idx) => {
            console.log("post = ", post);
            if (post.open) {
              if (post.category === "Project") {
                return (
                  <div
                    className="B_RoomCard"
                    value={post.id}
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

                    <div className="B_RommCard-info">
                      <div className="B_RoomCard-category" value={post.id}>
                        {post.category}
                      </div>
                      <div className="B_RoomCard-title" value={post.id}>
                        {post.title}
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
                    <div className="B_RommCard-info">
                      <div className="B_RoomCard-category" value={post.id}>
                        {post.category}
                      </div>
                      <div className="B_RoomCard-title" value={post.id}>
                        {post.title}
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
                  <div className="B_RoomCard-category" value={post.id}>
                    {post.category}
                  </div>
                  <div className="B_RoomCard-title" value={post.id}>
                    {post.title}
                  </div>
                  <div className="B_RoomCard-writer-createdAt" value={post.id}>
                    <div className="B_RoomCard-writer" value={post.id}>
                      {post.writer}
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
