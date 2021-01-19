import React, { useState } from "react";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import DataForm from "./dataForm";
import "../../styles/createRoom.css";
const axios = require("axios");
// import Context from "../../utils/context";

const CreateRoom = () => {
  // const [category, setCategory] = useContext(Context).categoryContext;
  const [category, setCategory] = useState("Project");
  const [title, setTitle] = useState("");
  const [crew, setCrew] = useState("");
  const [position, setPosition] = useState([]);
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
    setCrew(e);
    console.log("crew", crew);
  };

  const getPosition = (e) => {
    setPosition(e);
    console.log("position", position);
    console.log(e);
  };

  const getStack = (e) => {
    !e.target.value ? setStack("") : setStack(e.target.value);
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

  const studyType = ["Project", "Study", "Question"];

  const postStudyType = studyType.map((el, idx) => {
    return (
      <option value={el} key={idx}>
        {el}
      </option>
    );
  });

  return (
    <div className="Create_Container">
      <h2>Create Post</h2>
      <select onChange={(e) => setCategory(e.target.value)}>
        <>{postStudyType}</>
      </select>
      <div>
        <textarea
          className="title_Box"
          placeholder="제목을 입력해주세요"
        ></textarea>
      </div>

      <DataForm
        className="Dataform"
        category={category}
        crew={getCrew}
        title={getTitle}
        position={getPosition}
        stack={getStack}
      />

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
        <button onClick={() => postRoomInfo()}>SAVE</button>
      </footer>
    </div>
  );
};

export default CreateRoom;
