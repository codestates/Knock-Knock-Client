import React, { useState } from "react";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import DataForm from "./dataForm";
import "../../styles/createRoom.css";
const axios = require("axios");
// import Context from "../../utils/context";

const CreateRoom = () => {
  // const [category, setCategory] = useContext(Context).categoryContext;
  const [category, setCategory] = useState("");
  const [title, setTitle] = useState("");
  const [crew, setCrew] = useState("");
  const [positon, setPosition] = useState("");
  const [stack, setStack] = useState("");
  const [description, setDescription] = useState("");
  const [roominfo, setRoomInfo] = useState("");

  const createRoom = () => {
    axios({
      url: "/createRoom",
      method: "POST",
      data: {},
      withCredentials: true,
      headers: "application/json",
    });
  };

  const getTitle = (e) => {
    !e.target.value ? setTitle("") : setTitle(e.target.value);
  };

  const getCrew = (e) => {
    !e.target.value ? setCrew("") : setCrew(e.target.value);
  };

  const getPosition = (e) => {
    !e.target.value ? setPosition("") : setPosition(e.target.value);
  };

  const getStack = (e) => {
    !e.target.value ? setStack("") : setStack(e.target.value);
  };

  const getDescription = (e) => {
    !e.target.value ? setDescription("") : setDescription(e.target.value);
  };

  return (
    <div className="App">
      <h2>Create Post</h2>
      <select onChange={(e) => setCategory(e.target.value)}>
        <option>카테코리를 선택해주세요</option>
        <option>Project</option>
        <option>Study</option>
        <option>Question</option>
      </select>
      <div>
        <textarea placeholder="제목을 입력해주세요"></textarea>
      </div>

      <DataForm
        category={category}
        crew={getCrew}
        title={getTitle}
        position={getPosition}
        stack={getStack}
        description={getDescription}
      />

      <CKEditor
        editor={ClassicEditor}
        data="<h1>인수님 피곤해요?</h1>"
        onReady={(editor) => {
          // You can store the "editor" and use when it is needed.
          console.log("Editor is ready to use!", editor);
        }}
        onChange={(event, editor) => {
          const data = editor.getData();
          console.log({ event, editor, data });
        }}
        onBlur={(event, editor) => {
          console.log("Blur.", editor);
        }}
        onFocus={(event, editor) => {
          console.log("Focus.", editor);
        }}
      />

      <footer className="C_footer">
        <button>SAVE</button>
      </footer>
    </div>
  );
};

export default CreateRoom;
