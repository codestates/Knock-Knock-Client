/* eslint-disable */
import React, { useEffect, useState } from "react";
import "../../styles/board.css";
import together from "../../images/boardImg/together.png";
import closed from "../../images/boardImg/closed.png";
import question from "../../images/boardImg/Question.png";
import study from "../../images/boardImg/studyGroup.png";
import axios from "axios";

const PublicBoard = (props) => {
  console.log("프랍스 로케이션 스테이트", props.location);

  //const btnList = ["All", "Study", "Project", "Q&A"];

  const [posts, setPosts] = useState([]);
  const [postStacks, setPostStacks] = useState([]);
  const [postFilter, setPostFilter] = useState("");
  const [isUser, setIsUser] = useState(""); // 유저의 로그인 여부

  useEffect(async () => {
    // You need to restrict it at some point
    // This is just dummy code and should be replaced by actual

    let postsList;

    console.log("props.location.state = ", props.location.state);

    if (props.location.state) {
      const {
        boardType,
        boardPeopleNum,
        boardSearchText,
      } = props.location.state;
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

    // 나중에 수정 해야함(사용자 정보 변경 요청 주소 바뀔 경우)
    axios
      .get("https://localhost:4000/profile", { withCredentials: true })
      .then((user) => {
        setIsUser(user);
      });

    console.log("isUser = ", isUser);
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

            {isUser ? (
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
            if (post.open) {
              if (post.category === "Project") {
                return (
                  <div
                    className="B_RoomCard"
                    value={post.id}
                    onClick={roomCardClickHandler}
                  >
                    <img
                      src={together}
                      className="B_RoomCard-Img1"
                      alt=""
                      value={post.id}
                    />
                    <div className="B_RommCard-info">
                      <div className="B_RoomCard-category" value={post.id}>
                        {post.category}
                      </div>
                      <div className="B_RoomCard-title" value={post.id}>
                        {post.title}
                      </div>
                      <div className="B_RoomCard-total" value={post.id}>
                        최대 인원 {post.total}명
                      </div>
                      <div className="B_RoomCard-position" value={post.id}>
                        프론트엔드 {post.frontend}명 / 백엔드 {post.backend}명
                      </div>
                      <div className="B_RoomCard-stacks" value={post.id}>
                        {post.post_stacks.map((stack) => {
                          return (
                            <div className="B_RoomCard-stack" value={post.id}>
                              {stack}
                            </div>
                          );
                        })}
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
                    <img
                      src={study}
                      className="B_RoomCard-Img3"
                      alt=""
                      value={post.id}
                    />
                    <div className="B_RoomCard-category" value={post.id}>
                      {post.category}
                    </div>
                    <div className="B_RoomCard-title" value={post.id}>
                      {post.title}
                    </div>
                    <div className="B_RoomCard-total" value={post.id}>
                      최대 인원 {post.total}명
                    </div>
                    <div className="B_RoomCard-stacks" value={post.id}>
                      {post.post_stacks.map((stack) => {
                        return (
                          <div className="B_RoomCard-stack" value={post.id}>
                            {stack}
                          </div>
                        );
                      })}
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
                  <img
                    src={question}
                    className="B_RoomCard-Img4"
                    alt=""
                    value={post.id}
                  />
                  <div className="B_RoomCard-category" value={post.id}>
                    {post.category}
                  </div>
                  <div className="B_RoomCard-title" value={post.id}>
                    {post.title}
                  </div>
                  <div className="B_RoomCard-stacks" value={post.id}>
                    {post.post_stacks ? (
                      post.post_stacks.map((stack) => {
                        return (
                          <div className="B_RoomCard-stack" value={post.id}>
                            {stack}
                          </div>
                        );
                      })
                    ) : (
                      <></>
                    )}
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
      <div className="B_footer">Welcome to the party</div>
    </div>
  );
};

export default PublicBoard;
