import React, { useEffect, useState } from "react";
import "../../styles/board.css";
import together from "../../images/boardImg/together.png";
import closed from "../../images/boardImg/closed.png";
import question from "../../images/boardImg/Question.png";
import study from "../../images/boardImg/studyGroup.png";
import axios from "axios";

const PublicBoard = () => {
  const btnList = ["All", "Study", "Project", "Q&A", "그룹만들기"];

  const [posts, setPosts] = useState([]);
  const [postStacks, setPostStacks] = useState([]);

  useEffect(async () => {
    // You need to restrict it at some point
    // This is just dummy code and should be replaced by actual

    const posts = await axios.get("http://localhost:4000/posts");

    let postStacksArr = posts.data.data[0].post_stacks
      .slice(1, -1)
      .split(",")
      .map((stack) => {
        return stack.trim().slice(1, -1);
      });

    setPostStacks(postStacksArr);
    setPosts(posts.data.data);
  }, []);

  const roomCardClickHandler = (event) => {
    console.log(event.nativeEvent.path[0].attributes.value.value);
  };

  return (
    <div classNmae="B_container">
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
          </ul>
        </nav>
        <tbody className="B_RoomContaniner">
          {posts.map((post) => {
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
                      {postStacks.map((stack) => {
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
        </tbody>
      </div>
      <div className="B_footer">Welcome to the party</div>
    </div>
  );
};

export default PublicBoard;
