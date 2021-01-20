import React, { useState } from "react";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import DataForm from "./dataForm";
import "../../styles/createRoom.css";

const axios = require("axios");

const CreateRoom = () => {
  const [category, setCategory] = useState("Category");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [roominfo, setRoomInfo] = useState("");
  const [isCreater, setIsCreater] = useState(true);

  const [crew, setCrew] = useState(0); // project 필수 Study 필수 Question 없음
  const [position, setPosition] = useState([]); // project 필수 Study 없음 Question 없음
  const [stack, setStack] = useState([]); // project 필수 Study 선택 Question 선택

  const moveToCreater = () => {
    this.props.history.push("/createRoom");
    setIsCreater(false);
  };

  const createRoom = () => {
    axios({
      url: "/createRoom",
      method: "POST",
      data: {},
      withCredentials: true,
      headers: "application/json",
    });
  };

  const getCrew = (e) => {
    setCrew(e);
    console.log("crew", crew);
  };

  const getPosition = (e) => {
    setPosition(position.concat(e));
    console.log("position", position);
    console.log(e);
  };

  const getStack = (e) => {
    setStack(stack.concat(e));
  };

  const postRoomInfo = () => {
    const body = {
      category: category,
      title: title,
      crew: crew,
      position: position,
      stack: stack,
      description: description,
    };
    console.log("?????", body);
    // setRoomInfo(body);
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
        position={getPosition}
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
