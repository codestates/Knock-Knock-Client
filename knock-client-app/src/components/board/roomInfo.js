/* eslint-disable */
import React, { useState, useEffect } from "react";
import "../../styles/roomInfo.css";
import together from "../../images/boardImg/together.jpg";
import question from "../../images/boardImg/Question.jpg";
import study from "../../images/boardImg/studyGroup.jpg";
import PostReply from "./postReply";
import axios from "axios";
import { logoImg } from "../../utils/options";

const RoomInfo = (props) => {
  // 네비게이션 모달 로그아웃을 위한 히스토리 객체 전달
  props.getHistoryHandler(props.history);

  const [reply, setReply] = useState([]); //
  const [text, setText] = useState("");
  const [errmessage, setErrmessage] = useState("");
  const [positionRatio, setPositionRatio] = useState({});
  const [isInvolved, setIsInvolved] = useState(
    props.location.state.userInvolved
  );
  const [backend, setBackend] = useState("");
  const [frontend, setFrontend] = useState("");
  const [total, setTotal] = useState("");

  // board.js 로 push 받은 게시물 정보를 초기값으로 설정
  // 게시물 신청 후 신청된 게시물에 대한 정보로 postInfo 값 변경
  const [postInfo, setPostInfo] = useState(props.location.state);

  const submitForm = () => {
    if (window.localStorage.getItem("isLogin")) {
      const body = {
        backend: positionRatio.backend,
        frontend: positionRatio.frontend,
        postid: postInfo.id,
        category: postInfo.category,
      };

      if (postInfo.category === "Project") {
        if (positionRatio.frontend || positionRatio.backend) {
          if (
            (postInfo.frontend === 0 && positionRatio.frontend) ||
            (postInfo.backend === 0 && positionRatio.backend)
          ) {
            alert("신청할 수 없는 포지션입니다!");
            return;
          }
          axios
            .post(`https://localhost:4000/join`, body, {
              withCredentials: true,
            })
            .then((data) => {
              if (data.message !== "userid not found!") {
                alert(
                  `${
                    positionRatio.frontend ? "Frontend" : "Backend"
                  } 포지션으로 신청되었습니다.`
                );
                setPostInfo(() => ({ ...data.data.data, postInfo }));
                setIsInvolved(true);
                return;
              }
            });
        } else {
          return alert("원하는 포지션을 선택해주세요.");
        }
      }
      if (postInfo.category === "Study") {
        if (postInfo.total === 0) {
          alert("해당 스터디는 신청할 수 없습니다!");
          return;
        }

        axios
          .post(
            `https://localhost:4000/join`,
            { ...body, frontend: 0, backend: 0 },
            { withCredentials: true }
          )
          .then((data) => {
            if (data.message !== "userid not found!") {
              alert(`스터디가 신청되었습니다.`);
              setPostInfo(() => ({ ...data.data.data, postInfo }));
              setIsInvolved(true);
            } else {
              alert("이미 신청하셨습니다.");
            }
          });
      }
    } else if (
      window.localStorage.getItem("isLogin") &&
      !postInfo.username.split("").includes("기")
    ) {
      alert(
        "계정관리에서 유저아이디를 코드스테이츠 기수로 변경 후 이용해주세요."
      );
    } else if (!window.localStorage.getItem("isLogin")) {
      alert("로그인 후에 이용해주세요.");
    }
  };

  const getPostComments = async () => {
    const postComments = await axios.get(
      `https://localhost:4000/comments/${postInfo.id}`,
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
          .get("https://localhost:4000/profile", {
            withCredentials: true,
          })
          .then((getUserInfo) => {
            const { id, username } = getUserInfo.data.userdata;
            axios
              .post(
                "https://localhost:4000/comments",
                {
                  writer: username,
                  comment: text,
                  userid: id,
                  postid: postInfo.id,
                },
                { withCredentials: true }
              )
              .then((postComments) => {
                setReply(postComments.data.data);
              });
          });
      }
    } else {
      alert("로그인 후에 이용해주세요.");
    }
  };

  const commentChangeHandler = (event) => {
    setText(event.target.value);
  };

  const deleteCommentHandler = (delCommentId) => {
    axios
      .delete("https://localhost:4000/comments", {
        data: {
          postid: postInfo.id,
          commentid: delCommentId,
        },
        withCredentials: true,
      })
      .then((afterDelCommentList) => {
        alert("댓글을 삭제했습니다!");
        setReply(afterDelCommentList.data.data);
      });
  };

  useEffect(() => {
    getPostComments();

    setBackend(postInfo.backend);
    setFrontend(postInfo.frontend);
    setTotal(postInfo.total);
  }, [postInfo, isInvolved]);

  return (
    <>
      <div className="C_flexbox-container">
        <header className="board"></header>
        <div className="C_SideBarSec"></div>
        <div className="Body_sec">
          <div className="RoomInfo">
            <div className="RoomInfo_Brief">
              {postInfo.category !== "Project" ? (
                postInfo.category !== "Question" ? (
                  postInfo.category !== "Closed" ? (
                    <>
                      <div className="Brief_status">OPEN</div>
                      <img src={study} className="Brief_img" />
                    </>
                  ) : (
                    <></>
                  )
                ) : postInfo.open ? (
                  <>
                    <div className="Brief_status">OPEN</div>
                    <img src={question} className="Brief_img" />
                  </>
                ) : (
                  <>
                    <div className="Brief_status">CLOSED</div>
                    <img src={question} className="Brief_img" />
                  </>
                )
              ) : (
                <>
                  <div className="Brief_status">OPEN</div>
                  <img src={together} className="Brief_img" />
                </>
              )}
              <div className="Brief_info">
                <div className="B_info-category">{postInfo.category}</div>
                <div className="B_info-title">
                  {postInfo.title.length >= 32
                    ? postInfo.title.substr(0, 32) + "..."
                    : postInfo.title}
                </div>
              </div>
              <div className="Brief_writer_createdAt">
                <div className="Brief_writer">
                  {postInfo.category === "Question"
                    ? "Question"
                    : postInfo.writer}
                </div>
                <div className="Brief_createdAt">
                  {postInfo.created_at.split("T")[0]}
                </div>
              </div>
            </div>
            <div className="RoomInfo_Detail">
              <div className="Detail_info-wrap">
                <div className="Detail_info">
                  <div className="D_info-category">{postInfo.category}</div>
                  <div className="D_info-title">{postInfo.title}</div>
                  <div className="D_info_total_position">
                    {postInfo.category !== "Question" ? (
                      <div className="D_info-total">최대 인원 {total}명</div>
                    ) : (
                      <></>
                    )}
                    {postInfo.category === "Project" ? (
                      <div className="D_info-position">
                        프론트엔드 {frontend}명 / 백엔드 {backend}명
                      </div>
                    ) : (
                      <></>
                    )}
                  </div>

                  <div className="D_info-stacks-wrap">
                    <div className="D_info-stacks-title">스택</div>
                    {postInfo.post_stacks ? (
                      <div className="D_info-stakcs">
                        {postInfo.post_stacks.split(",").map((stack) => {
                          for (let key in logoImg) {
                            if (stack === key) {
                              return (
                                <img
                                  className="D_info-stack"
                                  src={logoImg[key]}
                                />
                              );
                            }
                          }
                        })}
                      </div>
                    ) : (
                      <div className="D_info-stakcs-none">스택없음</div>
                    )}
                  </div>
                  <div className="D_info-content-wrap">
                    {postInfo.category !== "Question" ? (
                      <>
                        <div className="D_info-content-title">소개</div>
                        <div
                          className="D_info-content"
                          dangerouslySetInnerHTML={{
                            __html: postInfo.content,
                          }}
                        ></div>
                      </>
                    ) : (
                      <>
                        <div className="D_question-content-title">질문</div>
                        <div
                          className="D_question-content"
                          dangerouslySetInnerHTML={{
                            __html: postInfo.content,
                          }}
                        ></div>
                      </>
                    )}
                  </div>
                </div>

                {!isInvolved ? (
                  <div className="Detail_info-involve">
                    {postInfo.category !== "Question" ? (
                      postInfo.category === "Project" ? (
                        <div className="Detail_info-involve-title">포지션</div>
                      ) : (
                        <div className="Detail_info-involve-title">
                          스터디 참여
                        </div>
                      )
                    ) : (
                      <></>
                    )}

                    {postInfo.category !== "Question" ? (
                      <div className="Detail_info-involve-position">
                        {postInfo.category !== "Study" ? (
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
                        {postInfo.category !== "Question" ? (
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
                ) : postInfo.category !== "Question" ? (
                  <h2>신청이 완료된 게시물입니다.</h2>
                ) : (
                  <></>
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
                  category={props.location ? postInfo.category : ""}
                />
                <li>{errmessage}</li>
              </ul>
            ) : (
              <ul>
                <PostReply
                  value={reply}
                  deleteCommentHandler={deleteCommentHandler}
                  category={props.location ? postInfo.category : ""}
                />
              </ul>
            )}
            <div>
              <form className="Reply_input_form">
                <textarea
                  onChange={commentChangeHandler}
                  className="ReplyBox"
                />

                <input
                  className="SendBtn"
                  type="reset"
                  value="Send"
                  onClick={sendReply}
                />
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default RoomInfo;
