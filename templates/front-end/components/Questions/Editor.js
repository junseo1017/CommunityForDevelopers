/** @jsxImportSource @emotion/react */
import { css, jsx } from "@emotion/react";
import { useEffect } from "react";
import EditorJs from "@editorjs/editorjs";
import { EDITOR_JS_TOOLS } from "./tools";
import { ColFlexBox, EditorContainer, EditorStyle } from "./styles/QuestionStyle";
import { Divider } from "antd";

const Editor = (props) => {
  const initEditor = () => {
    new EditorJs({
      holder: "editor",
      autofocus: true,
      tools: {
        ...EDITOR_JS_TOOLS,
      },
      data: {
        blocks: [
          {
            id: "8k0gwVsxdt",
            type: "header",
            data: {
              text: "상세히 작성해주세요.",
              level: 2,
            },
          },
        ],
        version: "2.11.10",
      },
    });
  };
  useEffect(() => {
    initEditor();
  }, []);

  return (
    <div css={ColFlexBox}>
      <h2>{props.title}</h2>
      <div css={EditorContainer}>
        <Divider plain />
        <div id="editor" css={EditorStyle}></div>
        <Divider plain />
      </div>
    </div>
  );
};

export default Editor;
