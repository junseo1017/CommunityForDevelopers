/** @jsxImportSource @emotion/react */
import { css, jsx } from "@emotion/react";
import { LoadingOutlined } from "@ant-design/icons";
import React, { useEffect, useState } from "react";
import { createReactEditorJS } from "react-editor-js";
import Image from "@editorjs/image";
const ReactEditorJS = createReactEditorJS();

const Editor = ({ imageArray, handleInitialize, data }) => {
  const [editorTools, setEditorTools] = useState("");
  // const readData = JSON.parse(data);

  // 에디터 사이즈 설정
  const EditorSize = css`
    width: 100%;
    height: 100%;
  `;

  // 에디터 컴포넌트 구현
  const editorComponent = !editorTools ? (
    <LoadingOutlined />
  ) : (
    <ReactEditorJS
      css={EditorSize}
      onInitialize={handleInitialize}
      tools={editorTools}
      placeholder={`질문/답변을 작성해주세요`}
      data={data}
    />
  );

  useEffect(() => {
    const importConstants = async () => {
      const EDITOR_JS_TOOLS = (await import("./tools")).default;

      // 에디터 기존 도구 불러오기 및 이미지 도구 추가
      const tools = {
        ...EDITOR_JS_TOOLS,
        image: {
          class: Image,
          config: {
            uploader: {
              uploadByFile(file) {
                let formData = new FormData();
                formData.append("images", file);

                // 서버에 이미지 전달하기
                return API.imageUpload(formData).then((response) => {
                  imageArray.push(response.data.data);
                  return {
                    success: 1,
                    file: {
                      url: response.data.data,
                    },
                  };
                });
              },
            },
          },
        },
      };
      setEditorTools(tools);
    };
    importConstants();
  }, []);

  return <div css={EditorSize}>{editorComponent}</div>;
};

export default Editor;
