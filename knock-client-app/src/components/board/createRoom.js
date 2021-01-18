import React, { useState } from "react";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import DataForm from "./dataForm";
import "../../styles/createRoom.css";
// import Context from "../../utils/context";

const CreateRoom = () => {
  // const [category, setCategory] = useContext(Context).categoryContext;
  const [category, setCategory] = useState("");
  const setting = (e) => {
    setCategory(e.target.value);
  };

  // const dataForm = () => {

  // }

  return (
    <div className="App">
      <h2>Create Post</h2>
      <select onChange={(e) => setting(e)}>
        <option value="">카테코리를 선택해주세요</option>
        <option value="Project">Project</option>
        <option value="Study">Study</option>
        <option value="Question">Question</option>
      </select>
      <div>
        <textarea placeholder="제목을 입력해주세요"></textarea>
      </div>
      <DataForm category={category} />
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
