/** @jsxImportSource @emotion/react */
import React, { useEffect, useState } from "react";
import { createReactEditorJS } from "react-editor-js";
import Image from "@editorjs/image";
import { DEFAULTVALUE } from "./defaultValue";
import { EditorSize, TextCener } from "./styles/EditorStyle";
import { uploadImages } from "../../actions/image";
import { useDispatch, useSelector } from "react-redux";
import { backendUrl } from "../../config/config";
import axios from "axios";
const ReactEditorJS = createReactEditorJS();

//import API from "../api/image" // Your server url

const Editor = ({ imageArray, handleInitialize, data }) => {
  const { singlePortfolio } = useSelector((state) => state.portfolio);
  const dispatch = useDispatch();
  const [editorTools, setEditorTools] = useState("");
  let editorComponent;
  if (!editorTools) editorComponent = "Loading...";
  else {
    editorComponent = (
      <div>
        <ReactEditorJS
          onInitialize={handleInitialize}
          tools={editorTools}
          placeholder={`포트폴리오 내용을 작성해주세요`}
          defaultValue={singlePortfolio.content && JSON.parse(singlePortfolio.content)}
        />
      </div>
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
              async uploadByFile(file) {
                const formData = new FormData();
                formData.append("image", file);
                // send image to server
                // get the uploaded image path, pushing image path to image array
                axios.defaults.baseURL = backendUrl;
                axios.defaults.withCredentials = true;
                return axios.post("/api/images", formData).then((res) => {
                  // get the uploaded image path, pushing image path to image array
                  imageArray.push(res.data.imgUrl);
                  return {
                    success: 1,
                    file: {
                      url: res.data.imgUrl,
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
  return (
    <div style={{ width: "100%" }}>
      <h1 css={TextCener}>내용 작성</h1>
      <div css={EditorSize}>{editorComponent}</div>
    </div>
  );
};

export default Editor;
