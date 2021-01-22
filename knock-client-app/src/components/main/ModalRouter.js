import React from "react";
import ReactDOM from "react-dom";
import Modal from "react-modal";
import "../../styles/home.css";
import github from "../../images/logo/github.png";
import google from "../../images/logo/google.png";

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

export default function ModalRouter() {
  var subtitle;
  const googleOAuthUrl = `
      https://accounts.google.com/o/oauth2/v2/auth?client_id=872667981680-k0ccru0v0ilhup1bs98maa4vhl2v80qd.apps.googleusercontent.com&redirect_uri=https://localhost:3000/mngAccount&response_type=code&scope=https://www.googleapis.com/auth/userinfo.email+https://www.googleapis.com/auth/userinfo.profile
      `;
  const [modalIsOpen, setIsOpen] = React.useState(false);
  function openModal() {
    setIsOpen(true);
  }

  function googleOAuthHandler() {
    window.location.href = googleOAuthUrl;
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

  return (
    <div>
      <button onClick={openModal}>시작하기</button>
      <Modal
        isOpen={modalIsOpen}
        onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
        style={customStyles}
        ariaHideApp={false}
        contentLabel="Example Modal"
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
}
