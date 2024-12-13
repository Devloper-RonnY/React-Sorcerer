import React, {useEffect } from "react";
import {
  Editor,
  EditorState,
  RichUtils,
  Modifier,
  convertFromRaw,
} from "draft-js";

const EditorComponent = ({ editorState, setEditorState }) => {
  useEffect(() => {
    const savedContent = localStorage.getItem("draftContent");
    if (savedContent) {
      const content = convertFromRaw(JSON.parse(savedContent));
      setEditorState(EditorState.createWithContent(content));
    }
  }, [setEditorState]);

  const handleKeyCommand = (command, state) => {
    const newState = RichUtils.handleKeyCommand(state, command);
    if (newState) {
      setEditorState(newState);
      return "handled";
    }
    return "not-handled";
  };

  const handleBeforeInput = (chars, state) => {
    const currentContent = state.getCurrentContent();
    const selection = state.getSelection();
    const blockKey = selection.getStartKey();
    const blockText = currentContent.getBlockForKey(blockKey).getText();

    if (blockText === "#" && chars === " ") {
      const newContent = Modifier.replaceText(
        currentContent,
        selection.merge({ anchorOffset: 0, focusOffset: 1 }),
        ""
      );
      const newState = EditorState.push(state, newContent, "change-block-type");
      setEditorState(RichUtils.toggleBlockType(newState, "header-one"));
      return "handled";
    }

    if (blockText === "*" && chars === " ") {
      const newContent = Modifier.replaceText(
        currentContent,
        selection.merge({ anchorOffset: 0, focusOffset: 1 }),
        ""
      );
      const newState = EditorState.push(
        state,
        newContent,
        "change-inline-style"
      );
      setEditorState(RichUtils.toggleInlineStyle(newState, "BOLD"));
      return "handled";
    }

    if (blockText === "**" && chars === " ") {
      const newContent = Modifier.replaceText(
        currentContent,
        selection.merge({ anchorOffset: 0, focusOffset: 2 }),
        ""
      );
      const newState = EditorState.push(
        state,
        newContent,
        "change-inline-style"
      );
      setEditorState(RichUtils.toggleInlineStyle(newState, "RED"));
      return "handled";
    }

    if (blockText === "***" && chars === " ") {
      const newContent = Modifier.replaceText(
        currentContent,
        selection.merge({ anchorOffset: 0, focusOffset: 3 }),
        ""
      );
      const newState = EditorState.push(
        state,
        newContent,
        "change-inline-style"
      );
      setEditorState(RichUtils.toggleInlineStyle(newState, "UNDERLINE"));
      return "handled";
    }

    return "not-handled";
  };

  return (
    <div
      style={{
        border: "1px solid #ccc",
        padding: "10px",
        borderRadius: "4px",
        minHeight: "200px",
      }}
      onClick={() => document.querySelector(".DraftEditor-root")?.focus()}
    >
      <Editor
        editorState={editorState}
        onChange={setEditorState}
        handleKeyCommand={handleKeyCommand}
        handleBeforeInput={handleBeforeInput}
        customStyleMap={{
          RED: { color: "red" },
        }}
      />
    </div>
  );
};

export default EditorComponent;
