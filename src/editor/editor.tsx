import React from "react";

import "./editor.style.css";
import { handleOnKeyDown } from "../services/events";

interface Props {}

const Editor: React.FC<Props> = () => {
  const defaultContent = "This is a default content";
  const [content, setContent] = React.useState("");
  const editorElement = React.useRef<HTMLDivElement>(null);

  const onKeyDown: React.KeyboardEventHandler<HTMLDivElement> = (e) => {
    if (editorElement.current) {
      handleOnKeyDown(e as unknown as KeyboardEvent, editorElement.current);
    }
  };

  return (
    <div
      className="editor"
      contentEditable={true}
      onKeyDown={onKeyDown}
      dangerouslySetInnerHTML={{ __html: defaultContent }}
      ref={editorElement}
    />
  );
};

export default Editor;
