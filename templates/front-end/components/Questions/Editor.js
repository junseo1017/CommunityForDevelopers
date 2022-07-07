/** @jsxImportSource @emotion/react */
import { css, jsx } from "@emotion/react";
import { useEffect } from "react";
import EditorJs from "@editorjs/editorjs";
import { EDITOR_JS_TOOLS } from "./tools";
import { ColFlexBox, EditorStyle } from "./styles/QuestionStyle";
import { Divider } from "antd";

const Editor = () => {
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
              text: "궁금한 질문을 상세히 작성해주세요.",
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
      <h1>질문을 작성해 주세요.</h1>
      <Divider plain />
      ..
      <div id="editor" css={EditorStyle}></div>
    </div>
  );
};

export default Editor;
