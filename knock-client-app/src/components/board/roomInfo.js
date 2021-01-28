/* eslint-disable */
import React, { useState, useEffect } from "react";
import "../../styles/roomInfo.css";
import together from "../../images/boardImg/together.jpg";
import question from "../../images/boardImg/Question.jpg";
import study from "../../images/boardImg/studyGroup.jpg";
import PostReply from "./postReply";
import axios from "axios";

const RoomInfo = (props) => {
  const [reply, setReply] = useState([]); //
  const [text, setText] = useState("");
  const [errmessage, setErrmessage] = useState("");
  const [positionRatio, setPositionRatio] = useState({});
  const [crewCounter, setCrewCounter] = useState({});

  const submitForm = () => {
    if (window.localStorage.getItem("isLogin")) {
      const body = {
        backend: positionRatio.backend,
        frontend: positionRatio.frontend,
        postid: props.location.state.id,
        category: props.location.state.category,
      };

      if (props.location.state.category === "Project") {
        // 버튼을 두번 눌러야 요청이 간다.
        if (positionRatio !== {}) {
          axios
            .post(`https://localhost:4000/join`, body, {
              withCredentials: true,
            })
            .then((data) => {
              data.message !== "userid not found!"
                ? alert(
                    `${
                      positionRatio.frontend ? "Frontend" : "Backend"
                    } 포지션으로 신청되었습니다.`
                  )
                : alert("다시 시도해주세요.");
            });
          // 방에 대한 정보를 받아 온 후 마이페이지에 방의 정보가 등록되게 해야한다.
        } else {
          alert("원하는 포지션을 선택해주세요.");
        }
        if (props.location.state.category === "Study") {
          axios.post(
            `https://localhost:4000/join`,
            { ...body, frontend: 0, backend: 0 },
            { withCredentials: true }
          );
        }
      } else {
        alert("로그인을 해주세요.");
      }
    }
  };

  const getPostComments = async () => {
    const postComments = await axios.get(
      `https://localhost:4000/comments/${props.location.state.id}`,
      { withCredentials: true }
    );
    setReply(postComments.data.data);
  };

  const sendReply = () => {
    if (window.localStorage.getItem("isLogin")) {
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
    } else {
      alert("로그인을 해주세요.");
    }
  };

  const commentChangeHandler = (event) => {
    setText(event.target.value);
  };

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
    console.log("프랍스로케이션스테이트", props.location);
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
              {props.location.state.category !== "Project" ? (
                props.location.state.category !== "Question" ? (
                  props.location.state.category !== "Closed" ? (
                    <img src={study} className="Brief_img" />
                  ) : (
                    <></>
                  )
                ) : (
                  <img src={question} className="Brief_img" />
                )
              ) : (
                <img src={together} className="Brief_img" />
              )}
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
                  {props.location.state.post_stacks ? (
                    props.location.state.post_stacks.map((stack) => {
                      return <div className="B_info-stack">{stack}</div>;
                    })
                  ) : (
                    <></>
                  )}
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
                    {props.location.state.category !== "Question" ? (
                      <div className="D_info-total">
                        최대 인원 {props.location.state.total}명
                      </div>
                    ) : (
                      <></>
                    )}
                    {props.location.state.category === "Project" ? (
                      <div className="D_info-position">
                        프론트엔드 {props.location.state.frontend}명 / 백엔드{" "}
                        {props.location.state.backend}명
                      </div>
                    ) : (
                      <></>
                    )}
                  </div>

                  <div className="D_info-stacks-wrap">
                    <div className="D_info-stacks-title">스택</div>
                    {props.location.state.post_stacks ? (
                      <div className="D_info-stakcs">
                        {props.location.state.post_stacks}
                      </div>
                    ) : (
                      <div className="D_info-stakcs">스택없음</div>
                    )}
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

                {!props.location.state.userInvolved ? (
                  <div className="Detail_info-involve">
                    {props.location.state.category !== "Question" ? (
                      props.location.state.category === "Project" ? (
                        <div className="Detail_info-involve-title">포지션</div>
                      ) : (
                        <div className="Detail_info-involve-title">
                          스터디 참여
                        </div>
                      )
                    ) : (
                      <></>
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
                              onChange={() =>
                                setPositionRatio({ frontend: 1, backend: 0 })
                              }
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
                              onChange={() =>
                                setPositionRatio({ frontend: 0, backend: 1 })
                              }
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
                        {props.location.state.category !== "Question" ? (
                          <button
                            className="submitBtn"
                            onClick={() => submitForm()}
                          >
                            신청하기
                          </button>
                        ) : (
                          <></>
                        )}
                      </div>
                    ) : (
                      <></>
                    )}
                  </div>
                ) : (
                  <h2>신청이 완료된 게시물입니다.</h2>
                )}
              </div>
            </div>
          </div>

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
