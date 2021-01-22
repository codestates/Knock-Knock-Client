import React, { useEffect, useState } from "react";
import "../../styles/board.css";
import together from "../../images/boardImg/together.png";
import closed from "../../images/boardImg/closed.png";
import question from "../../images/boardImg/Question.png";
import study from "../../images/boardImg/studyGroup.png";
import axios from "axios";

const PublicBoard = (props) => {
  console.log(props.location.state);

  const btnList = ["All", "Study", "Project", "Q&A"];

  const [posts, setPosts] = useState([]);
  const [postStacks, setPostStacks] = useState([]);
  const [isUser, setIsUser] = useState("");

  useEffect(async () => {
    // You need to restrict it at some point
    // This is just dummy code and should be replaced by actual

    let posts;

    if (props.location.state) {
      const {
        boardType,
        boardPeopleNum,
        boardSearchText,
      } = props.location.state;

      posts = await axios.get(
        `https://localhost:4000/search?category=${boardType}&total=${boardPeopleNum}&title=${boardSearchText}`,
        { withCredentials: true }
      );
    } else {
      posts = await axios.get(
        `https://localhost:4000/search?category=&total=&title=`,
        { withCredentials: true }
      );
    }

    // 전체 게시물을 보여주기 posts 값 가공
    let postsArr = [];
    posts.data.data.forEach((post) => {
      let postObj = {
        id: post.id,
        category: post.category,
        title: post.title,
        total: post.total,
        open: post.open,
        frontend: post.frontend,
        backend: post.backend,
      };
      
      // 스택 가공 코드 수정 해야함 [이준희]
      if (post.post_stacks) {
        postObj.post_stacks = post.post_stacks.slice(1, -1).split(",");
      }

      postsArr.push(postObj);
    });

    setPosts(postsArr);
 
    // 나중에 수정 해야함(사용자 정보 변경 요청 주소 바뀔 경우)
    await axios
      .post("https://localhost:4000/profile", {}, { withCredentials: true })
      .then((user) => {
        setIsUser(user);
      })
      .catch(() => {
        setIsUser("");
      });
  }, []);

  const roomCardClickHandler = async (event) => {
    const postId = event.nativeEvent.path[0].attributes.value.value;
    for (let post of posts) {
      if (post.id === Number(postId)) {
        props.history.push("/roomInfo", post);
      }
    }
  };

  return (
    <div className="B_container">
      {/* <header className="B_header"></header> */}
      <div className="B_flexbox-container">
        <nav className="B_SideBarSec">
          <ul>
            {btnList.map((el, idx) => {
              return (
                <li className="B_filterBtn" key={idx}>
                  {el}
                </li>
              );
            })}
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
          {/* !!!!!!!!!!!다른 카테고리의 게시물들 수정해야됨!!!!!!!!! */}

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
                    <div className="B_RoomCard-category" value={post.id}>
                      {post.category}
                    </div>
                    <div className="B_RoomCard-title" value={post.id}>
                      {post.title}
                    </div>
                    <div className="B_RoomCard-total">
                      최대 인원 {post.total}명
                    </div>
                    <div className="B_RoomCard-position">
                      프론트엔드 {post.frontend}명 / 백엔드 {post.backend}명
                    </div>
                    <div className="B_RoomCard-stacks">
                      {post.post_stacks.map((stack) => {
                        return <div className="B_RoomCard-stack">{stack}</div>;
                      })}
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
                    <p className="B_RoomCard-title" value={post.id}>
                      {post.title}
                    </p>
                  </div>
                );
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
                    <p className="B_RoomCard-title" value={post.id}>
                      {post.title}
                    </p>
                  </div>
                );
              }
            } else {
              return (
                <div
                  className="B_RoomCard"
                  value={post.id}
                  onClick={roomCardClickHandler}
                >
                  <img
                    src={closed}
                    className="B_RoomCard-Img2"
                    alt=""
                    value={post.id}
                  />
                  <p className="B_RoomCard-title" value={post.id}>
                    {post.title}
                  </p>
                </div>
              );
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
