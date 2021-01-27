/* eslint-disable */
import React, { Component, useEffect } from "react";
import Modal from "react-modal";
import "../../styles/home.css";
import github from "../../images/logo/github.png";
import google from "../../images/logo/google.png";
import { BrowserRouter as Route, Link } from "react-router-dom";
const axios = require("axios");

const customStyles = {
  content: {
    width: "300px",
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
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
    if (props.isModalLogin || window.localStorage.getItem("isLogin"))
      setIsLogin(true);
  }, [props.isModalLogin]);

  function afterOpenModal() {
    // references are now sync'd and can be accessed.
    subtitle.style.color = "#f00";
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
    if (props.accHistory.location.pathname) {
      if (props.accHistory.location.pathname !== "/") {
        props.accHistory.push("/");
      }
    } else {
      return;
    }
  }

  console.log("각시탈", props.accHistory);
  return isLogin ? (
    <div>
      <button onClick={openModal}>로그인상태</button>
      <Modal
        isOpen={modalIsOpen}
        onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
        style={customStyles}
        ariaHideApp={false}
      >
        <h1 ref={(_subtitle) => (subtitle = _subtitle)}>Knock Knock</h1>
        <div>나는 멋진 감자</div>
        <div className="navBtn">
          <span onClick={closeModal} className="navbar_board">
            <Link to="/board">BOARD</Link>
          </span>
          <span onClick={closeModal} className="navbar_mypage">
            <Link to="/mypage">Mypage</Link>
          </span>
          <span onClick={closeModal} className="navbar_mypage">
            <Link to="/createRoom">CreateRoom</Link>
          </span>
        </div>
        <button onClick={logOut}>로그아웃</button>
        <button onClick={closeModal}>뒤로가기</button>
      </Modal>
    </div>
  ) : (
    <div>
      <button onClick={openModal}>로그아웃상태</button>
      <Modal
        isOpen={modalIsOpen}
        onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
        style={customStyles}
        ariaHideApp={false}
      >
        <h1 ref={(_subtitle) => (subtitle = _subtitle)}>Knock Knock</h1>
        <div>로그인을 해주세요.</div>
        <form>
          <div className="login_logo">
            <img
              className="google"
              onClick={googleOAuthHandler}
              alt=""
              value="google"
              src={google}
            ></img>
            <img
              className="github"
              onClick={gitOAuthHandler}
              alt=""
              value="github"
              src={github}
            ></img>
          </div>
        </form>
        <button onClick={closeModal}>뒤로가기</button>
      </Modal>
    </div>
  );
};

export default ModalRouter;
