/* eslint-disable */
import React, { Component, useEffect } from "react";
import Modal from "react-modal";
import "../../styles/home.css";
import github from "../../images/logo/github.png";
import google from "../../images/logo/google.png";
import { BrowserRouter as Route, Link } from "react-router-dom";

import navRightImg1 from "../../images/homeImg/navRight1.png";
import createRoom from "../../images/homeImg/createRoom.png";
import mypage from "../../images/homeImg/mypage.png";
import board from "../../images/homeImg/board.png";
const axios = require("axios");

const customStyles = {
  content: {
    width: "300px",
    height: "300px",
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    radius: "100px",
  },
  overlay: { zIndex: 1000 },
};

const ModalRouter = (props) => {
  var subtitle;
  const googleOAuthUrl = `
      https://accounts.google.com/o/oauth2/v2/auth?client_id=872667981680-k0ccru0v0ilhup1bs98maa4vhl2v80qd.apps.googleusercontent.com&redirect_uri=https://localhost:3000/mngAccount&response_type=code&scope=https://www.googleapis.com/auth/userinfo.email+https://www.googleapis.com/auth/userinfo.profile
      `;

  const gitOAuthUrl = `https://github.com/login/oauth/authorize?client_id=e363bc17f9ecc211cdee&redirect_uri=https://localhost:3000/mngAccount`;

  const [modalIsOpen, setIsOpen] = React.useState(false);
  const [isLogin, setIsLogin] = React.useState(false);

  function openModal() {
    setIsOpen(true);
  }

  function googleOAuthHandler() {
    window.location.href = googleOAuthUrl;
    setIsOpen(false);
  }

  function gitOAuthHandler() {
    window.location.href = gitOAuthUrl;
    setIsOpen(false);
  }

  useEffect(() => {
    console.log(isLogin);
    if (props.isModalLogin || window.localStorage.getItem("isLogin"))
      setIsLogin(true);
  }, [props.isModalLogin]);

  function afterOpenModal() {
    // references are now sync'd and can be accessed.
  }

  function closeModal() {
    setIsOpen(false);
  }

  function logOut() {
    setIsLogin(false);
    setIsOpen(false);
    //로컬 스토리지 정보삭제와 함께 session 연결고리를 끊어준다.
    window.localStorage.removeItem("isLogin");
    window.localStorage.removeItem("username");
    window.localStorage.removeItem("userid");
    axios({
      method: "post",
      url: "https://localhost:4000/profile/signout",
      withCredentials: true,
    });
    //path로 길을 내야 사용할 수 있다. 그래서 profile까지 path를 연결한 것!
    if (props.accHistory && props.accHistory.location.pathname !== "/") {
      props.accHistory.push("/");
    }
  }

  return isLogin ? (
    <div>
      <img className="navRightImg" src={navRightImg1} onClick={openModal} />

      <Modal
        isOpen={modalIsOpen}
        onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
        style={customStyles}
        ariaHideApp={false}
      >
        <h1
          className="modal_subtitle"
          ref={(_subtitle) => (subtitle = _subtitle)}
        >
          Knock Knock
        </h1>

        <div className="navBtn">
          <span onClick={closeModal} className="navbar_board">
            <Link to="/board">
              <img className="Icon" src={board} value="board" alt="" />
            </Link>
          </span>
          <span onClick={closeModal} className="navbar_mypage">
            <Link to="/mypage">
              <img className="Icon" src={mypage} value="mypage" alt="" />
            </Link>
          </span>
          <span onClick={closeModal} className="navbar_mypage">
            <Link to="/createRoom">
              <img
                className="Icon"
                src={createRoom}
                value="createRoom"
                alt=""
              />
            </Link>
          </span>
        </div>
        <div className="navBtnOpt">
          <button className="navBtnOpt_logoutBtn" onClick={logOut}>
            로그아웃
          </button>
          <button className="navBtnOpt_backBtn" onClick={closeModal}>
            뒤로가기
          </button>
        </div>
      </Modal>
    </div>
  ) : (
    <div>
      <div className="startBtn" onClick={openModal}>
        들어가기
      </div>
      <Modal
        isOpen={modalIsOpen}
        onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
        style={customStyles}
        ariaHideApp={false}
      >
        <h1
          className="modal_subtitle"
          ref={(_subtitle) => (subtitle = _subtitle)}
        >
          Knock Knock
        </h1>

        <div>
          <div className="login_logo">
            <div className="login_google" onClick={googleOAuthHandler}>
              {" "}
              <img className="google" alt="" value="google" src={google}></img>
              <div className="login_google_phrase">Sign With Google</div>
            </div>
            <div className="login_github" onClick={gitOAuthHandler}>
              <img className="github" alt="" value="github" src={github}></img>
              <div className="login_github_phrase">Sign With Google</div>
            </div>
            <button className="login_backBtn" onClick={closeModal}>
              뒤로가기
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default ModalRouter;
