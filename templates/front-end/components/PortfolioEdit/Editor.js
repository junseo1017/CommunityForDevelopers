/** @jsxImportSource @emotion/react */
import { css, jsx } from "@emotion/react";
import React, { useEffect, useState } from "react";
import { createReactEditorJS } from "react-editor-js";
import Image from "@editorjs/image";
import { DEFAULTVALUE } from "./defaultValue";
const ReactEditorJS = createReactEditorJS();

//import API from "../api/image" // Your server url

const Editor = ({ imageArray, handleInitialize, data }) => {
  const [editorTools, setEditorTools] = useState("");
  const EditorSize = css`
    width: 100%;
    height: 100%;
  `;
  let editorComponent;
  if (!editorTools) editorComponent = "Loading...";
  else {
    editorComponent = (
      <ReactEditorJS
        css={EditorSize}
        onInitialize={handleInitialize}
        tools={editorTools}
        placeholder={`포트폴리오 내용을 작성해주세요`}
        defaultValue={DEFAULTVALUE}
      />
    );
  }

  useEffect(() => {
    const importConstants = async () => {
      const EDITOR_JS_TOOLS = (await import("./tools")).default;
      const tools = {
        ...EDITOR_JS_TOOLS,
        image: {
          class: Image,
          config: {
            uploader: {
              uploadByFile(file) {
                let formData = new FormData();
                formData.append("images", file);

                // send image to server
                return API.imageUpload(formData).then((res) => {
                  // get the uploaded image path, pushing image path to image array
                  imageArray.push(res.data.data);
                  return {
                    success: 1,
                    file: {
                      url: res.data.data,
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
