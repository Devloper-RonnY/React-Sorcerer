import React, { useState } from "react";
import Title from "./components/Title";
import EditorComponent from "./components/EditorComponents.jsx";
// import Btn from "./components/Btn";
import { EditorState } from "draft-js";

const App = () => {
  const [title, setTitle] = useState("")
  const [editorState, setEditorState] = useState(() => EditorState.createEmpty())

  return (
    <div style={{ padding: "20px" }}>
      <Title title={title} setTitle={setTitle} />
      <EditorComponent
        editorState={editorState}
        setEditorState={setEditorState}
      />
      {/* <Btn editorState={editorState} />{" "} */}
    </div>
  );
};

export default App;
