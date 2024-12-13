import React from "react";
import { convertToRaw } from "draft-js";

const Btn = ({ editorState }) => {
  const saveContent = () => {
    const content = editorState.getCurrentContent();
    localStorage.setItem("draftContent", JSON.stringify(convertToRaw(content)));
    alert("Content saved!");
  };

  return (
    <button
      onClick={saveContent}
      style={{
        marginTop: "10px",
        padding: "10px 15px",
        backgroundColor: "#007BFF",
        color: "white",
        border: "none",
        borderRadius: "4px",
      }}
    >
      Save
    </button>
  );
};

export default Btn;
