/* eslint-disable */
import React, { Component } from "react";
import Modal from "react-modal";
import "../../styles/home.css";
import github from "../../images/logo/github.png";
import google from "../../images/logo/google.png";
import { BrowserRouter as Route, Link } from "react-router-dom";
import PublicBoard from "../board/board";
import Mypage from "../mypage/Mypage";

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
  const [modalIsOpen, setIsOpen] = React.useState(false);
  const [isLogin, setIsLogin] = React.useState(false);

  const componets = {
    게시판: PublicBoard,
    마이페이지: Mypage,
  };

  function openModal() {
    setIsOpen(true);
  }

  function googleOAuthHandler() {
    window.location.href = googleOAuthUrl;
  }

  function componentDidMount() {
    if (window.localStorage.getItem("isLogin")) setIsLogin(true);
  }

  function afterOpenModal() {
    // references are now sync'd and can be accessed.
    subtitle.style.color = "#f00";
  }

  function closeModal() {
    setIsOpen(false);
  }

  function componentWillMount() {
    Modal.setAppElement("root");
  }

  function logOut() {
    setIsLogin(false);
    window.localStorage.removeItem("isLogin");
    window.localStorage.removeItem("username");
    window.localStorage.removeItem("userid");
  }

  console.log("asdasdasasd", isLogin);
  return !isLogin ? (
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
          <span className="navbar_board">
            <Link to="/board">BOARD</Link>
          </span>
          <span className="navbar_mypage">
            <Link to="/mypage">Mypage</Link>
          </span>
          <span className="navbar_mypage">
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
              onClick={(e) => console.log(e.target.value)}
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
