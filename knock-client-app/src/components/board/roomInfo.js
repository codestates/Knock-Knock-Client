import React, { useState, useEffect } from "react";
import "../../styles/roomInfo.css";
import together from "../../images/boardImg/together.png";
import PostReply from "./postReply";
import axios from "axios";

const RoomInfo = (props) => {
  console.log("이 안에는 뭐가 있나요 ?= ", props);
  const [reply, setReply] = useState([]); //
  const [text, setText] = useState("");
  const [errmessage, setErrmessage] = useState("");
  const [position, setPosition] = useState("");
  const [positionRatio, setPositionRatio] = useState({
    backend: 0,
    frontend: 0,
  });

  // const btnList = ["All", "Study", "Project", "Q&A", "그룹만들기"];
  // const sideBar = btnList.map((el, idx) => {
  //   return (
  //     <li className="C_filterBtn" key={idx}>
  //       {el}
  //     </li>
  //   );
  // });

  const submitForm = () => {
    console.log("이게 무엇인거 :??", positionRatio);
    if (props.location.state.category === "Project") {
      position === "frontend"
        ? setPositionRatio({ frontend: 1, backend: 0 })
        : setPositionRatio({ frontend: 0, backend: 1 });
    }

    const body = {
      backend: positionRatio.backend,
      frontend: positionRatio.frontend,
      postid: props.location.state.id,
      category: props.location.state.category,
    };

    console.log("바디가 무엇일까 ?", body);
    if (props.location.state.category === "Project") {
      if (position) {
        axios
          .post(`https://localhost:4000/join`, body, { withCredentials: true })
          .then((data) => {
            console.log("data", data);
            data.data !== "바보"
              ? alert(`${position} 포지션으로 신청되었습니다.`)
              : alert("다시 시도해주세요.");
          });
        // 방에 대한 정보를 받아 온 후 마이페이지에 방의 정보가 등록되게 해야한다.
      } else {
        // setErrmessage("원하는 포지션을 선택해주세요.");
        alert("원하는 포지션을 선택해주세요.");
      }
    } else if (props.location.state.category === "Study") {
      axios
        .post(`https://localhost:4000/join`, body, { withCredentials: true })
        .then((data) => {
          console.log("data", data);
          //만약 이미 참가한 상태의 유저라면 "이미 그룹에 속해있습니다."
          //만약 방이 클로스가 되었다면 "Closed된 게시글 입니다."

          alert("다시 시도해주세요.");
        });
    }
  };

  const getPostComments = async () => {
    const postComments = await axios.get(
      `https://localhost:4000/comments/${props.location.state.id}`,
      { withCredentials: true }
    );

    console.log("postComments = ", postComments);

    setReply(postComments.data.data);
  };

  const sendReply = () => {
    let replyInfo = {};
    if (text === "") {
      setErrmessage("텍스트를 입력하세요");
    } else {
      setErrmessage("");

      axios
        .get("https://localhost:4000/profile", { withCredentials: true })
        .then((getUserInfo) => {
          const { id, username } = getUserInfo.data.userdata;
          axios
            .post(
              "https://localhost:4000/comments",
              {
                writer: username,
                comment: text,
                userid: id,
                postid: props.location.state.id,
              },
              { withCredentials: true }
            )
            .then((postComments) => {
              setReply(postComments.data.data);
            });
        });
    }
    setReply(() => [...reply, replyInfo]);
  };

  const commentChangeHandler = (event) => {
    setText(event.target.value);
  };

  /*
    댓글 삭제 메소드
    PostReply 컴포넌트로 props 내린 후 댓글의 id 를
    매개변수로 받아서 처리
  */
  const deleteCommentHandler = (delCommentId) => {
    console.log("delCommentId = ", delCommentId);
    axios
      .delete("https://localhost:4000/comments", {
        data: {
          postid: props.location.state.id,
          commentid: delCommentId,
        },
        withCredentials: true,
      })
      .then((afterDelCommentList) => {
        alert("댓글을 삭제했습니다!");
        console.log("afterDelCommentList = ", afterDelCommentList);
        setReply(afterDelCommentList.data.data);
      });
  };

  useEffect(() => {
    getPostComments();
  }, [props.location.state.id]);

  return (
    <>
      <div className="C_flexbox-container">
        <header className="board"></header>
        <div className="C_SideBarSec">{/* <ul>{sideBar}</ul> */}</div>
        <div className="Body_sec">
          <div className="RoomInfo">
            <div className="RoomInfo_Brief">
              <img src={together} className="Brief_img" />
              <div className="Brief_info">
                <div className="B_info-category">
                  {props.location.state.category}
                </div>
                <div className="B_info-title">{props.location.state.title}</div>
                <div className="B_info-total">
                  최대 인원 {props.location.state.total}명
                </div>
                <div className="B_info-position">
                  프론트엔드 {props.location.state.frontend}명 / 백엔드{" "}
                  {props.location.state.backend}명
                </div>
                <div className="B_info-stacks">
                  {props.location.state.post_stacks.map((stack) => {
                    return <div className="B_info-stack">{stack}</div>;
                  })}
                </div>
              </div>
            </div>
            <div className="RoomInfo_Detail">
              <div className="Detail_info-wrap">
                <div className="Detail_info">
                  <div className="D_info-category">
                    {props.location.state.category}
                  </div>
                  <div className="D_info-title">
                    {props.location.state.title}
                  </div>
                  <div className="D_info_total_position">
                    <div className="D_info-total">
                      최대 인원 {props.location.state.total}명
                    </div>
                    <div className="D_info-position">
                      프론트엔드 {props.location.state.frontend}명 / 백엔드{" "}
                      {props.location.state.backend}명
                    </div>
                  </div>

                  <div className="D_info-stacks-wrap">
                    <div className="D_info-stacks-title">스택</div>
                    <div className="D_info-stakcs">
                      {props.location.state.post_stacks}
                    </div>
                  </div>

                  <div className="D_info-content-wrap">
                    <div className="D_info-content-title">소개</div>
                    <div
                      className="D_info-content"
                      dangerouslySetInnerHTML={{
                        __html: props.location.state.content,
                      }}
                    ></div>
                  </div>
                </div>
                <div className="Detail_info-involve">
                  {props.location.state.category === "Project" ? (
                    <div className="Detail_info-involve-title">포지션</div>
                  ) : (
                    <div className="Detail_info-involve-title">스터디 참여</div>
                  )}

                  {props.location.state.category !== "Question" ? (
                    <div className="Detail_info-involve-position">
                      {props.location.state.category !== "Study" ? (
                        <>
                          <label
                            htmlFor="frontend"
                            className="involve_frontend-label"
                          >
                            프론트엔드
                          </label>
                          <input
                            onChange={(e) => setPosition(e.target.value)}
                            type="radio"
                            id="frontend"
                            value="frontend"
                            key="frontend"
                            name="position"
                            className="involve_position-chkBox"
                          ></input>

                          <label
                            htmlFor="backend"
                            className="involve_backend-label"
                          >
                            백엔드
                          </label>
                          <input
                            onChange={(e) => setPosition(e.target.value)}
                            type="radio"
                            id="backend"
                            value="backend"
                            key="backend"
                            name="position"
                            className="involve_position-chkBox"
                          ></input>
                        </>
                      ) : (
                        <></>
                      )}
                      {props.location.state.category === "Project" ? (
                        <button
                          className="submitBtn"
                          onClick={() => submitForm()}
                        >
                          신청하기
                        </button>
                      ) : (
                        <button
                          className="study_submitBtn"
                          onClick={() => submitForm()}
                        >
                          신청하기
                        </button>
                      )}
                    </div>
                  ) : (
                    <></>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* 룸인포 -> 방정보/ 프로젝트or스터디orQuestion에 대한 소개글 [피그마 참고]*/}
          <div className="ReplyZone">
            {errmessage ? (
              <ul>
                <PostReply
                  value={reply}
                  deleteCommentHandler={deleteCommentHandler}
                />
                <li>{errmessage}</li>
              </ul>
            ) : (
              <ul>
                <PostReply
                  value={reply}
                  deleteCommentHandler={deleteCommentHandler}
                />
              </ul>
            )}
            <div className="Reply_input_form">
              <textarea onChange={commentChangeHandler} className="ReplyBox" />
              <button onClick={sendReply} className="SendBtn">
                Send
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default RoomInfo;
