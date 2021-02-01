/* eslint-disable */
import React, { useState, useEffect } from "react";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import DataForm from "./dataForm";

import "../../styles/createRoom.css";

import axios from "axios";

const CreateRoom = (props) => {
  // 네비게이션 모달 로그아웃을 위한 히스토리 객체 전달
  props.getHistoryHandler(props.history);

  const [category, setCategory] = useState("Category");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [crew, setCrew] = useState(0); // project 필수 Study 필수 Question 없음
  const [stack, setStack] = useState([]); // project 필수 Study 선택 Question 선택
  const [posFront, setPosFront] = useState(0); // project 필수 Study 없음 Question 없음
  const [posBack, setPosBack] = useState(0); // project 필수 Study 없음 Question 없음

  const getCrew = (e) => {
    setCrew(e);
    console.log("crew", crew);
  };

  const getStack = (e) => {
    if (stack.includes(e)) {
      stack.splice(stack.indexOf(e), 1);
      setStack(stack);
    } else {
      setStack(() => [...stack, e]);
    }
  };

  const postRoomInfo = () => {
    axios
      .get("https://localhost:4000/profile", {
        withCredentials: true,
      })
      .then((userInfo) => {
        if (
          window.localStorage.getItem("isLogin") &&
          !userInfo.data.userdata.username.split("").includes("기")
        ) {
          return alert(
            "계정관리에서 유저아이디를 코드스테이츠 기수로 변경 후 이용해주세요."
          );
        }
        console.log("크리에이트 룸의 유저인포입니다!!!!!!!!", userInfo);
        const body = {
          writer: userInfo.data.userdata.username,
          category: category,
          title: title,
          total: crew,
          backend: posBack,
          frontend: posFront,
          // 스택에 대한 수정 // 양쪽 괄호 빼기[이준희]
          post_stacks: `${String(stack)}`,
          content: description,
        };
        if (category === "Project") {
          if (
            !body.total ||
            !body.post_stacks ||
            !body.backend ||
            !body.frontend ||
            !body.content
          ) {
            return alert("모든 항목을 반드시 입력해주세요.");
          } else if (
            !(
              parseInt(body.backend) + parseInt(body.frontend) ===
              parseInt(body.total) - 1
            )
          ) {
            console.log(
              "parseInt(body.backend) + parseInt(body.frontend) = ",
              parseInt(body.backend) + parseInt(body.frontend)
            );
            return alert("설명을 다시 읽고 비율을 입력해주세요.");
          }
        }

        if (category === "Study") {
          if (!body.total) {
            return alert("모집인원을 선택해주세요.");
          }
        }
        axios
          .post("https://localhost:4000/posts", body, {
            withCredentials: true,
          })
          .then(() => {
            props.history.push("/board");
          });
      });
  };

  const studyType = ["Category", "Project", "Study", "Question"];

  const postStudyType = studyType.map((el, idx) => {
    return (
      <option className="listFont" value={el} key={idx}>
        {el}
      </option>
    );
  });

  return (
    <div className="Create_Container">
      <select
        className="Category"
        onChange={(e) => setCategory(e.target.value)}
      >
        <>{postStudyType}</>
      </select>
      <div>
        <textarea
          className="title"
          placeholder="제목을 입력하세요"
          onChange={(e) => setTitle(e.target.value)}
        ></textarea>
      </div>

      <DataForm
        category={category}
        crew={getCrew}
        positionFront={setPosFront}
        positionBack={setPosBack}
        stack={getStack}
      ></DataForm>

      <CKEditor
        editor={ClassicEditor}
        onReady={(editor) => {
          // You can store the "editor" and use when it is needed.
          console.log("Editor is ready to use!", editor);
        }}
        onChange={(event, editor) => {
          const data = editor.getData();
          setDescription(data);
        }}
        onBlur={(event, editor) => {
          console.log("Blur.", editor);
        }}
        onFocus={(event, editor) => {
          console.log("Focus.", editor);
        }}
      />

      <footer className="C_footer">
        <div className="sendBtn" onClick={() => postRoomInfo()}>
          완료
        </div>
      </footer>
    </div>
  );
};

export default CreateRoom;
