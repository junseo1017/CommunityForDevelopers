/** @jsxImportSource @emotion/react */
import { css, jsx } from "@emotion/react";
import React, { useState, useCallback, useRef } from "react";
import dynamic from "next/dynamic";
import { Button, Input } from "antd";
import { EditorContainer } from "../styles/QuestionStyle";

const Editor = dynamic(() => import("./Editor"), {
  ssr: false,
});

const AddEditor = ({ data }) => {
  console.log("data from AddEditor", typeof data);
  console.log("data from AddEditor", data);
  const editorCore = useRef(null);
  // 업로드된 이미지 추적
  const [imageArray, setImageArray] = useState([]);
  const [title, setTitle] = useState("");

  const handleInitialize = useCallback((instance) => {
    editorCore.current = instance;
  }, []);

  // 이미지 제거 함수
  const removeImage = (img) => {
    const newArr = imageArray.filter((image) => image !== img);
    setImageArray(newArr);
  };

  const saveContents = async () => {
    // 에디터의 컨텐츠를 가져와 서버에 저장하기
    try {
      const savedData = await editorCore.current.save();
      console.log("savedData", savedData);
      const data = {
        description: JSON.stringify(savedData),
      };
      console.log("data", data);

      // 서버에서 사용하지 않는 이미지 제거하기

      // 서버에 질문 저장하기
    } catch (e) {
      console.log(e);
    }
  };

  // 위에랑 합쳐서 데이터 보내기
  const saveTitle = (title) => {
    console.log("title", title);
  };

  // 사용하지 않는 이미지를 제거하기 위해 imageArray와 현재 에디터의 이미지를 가져와 비교하기
  const clearEditorLeftoverImages = async () => {
    // 현재 에디터의 이미지 가져오기(src에 '/images/'가 존재하는 요소)
    const currentImages = [];
    document
      .querySelectorAll(".image-tool__image-picture")
      .forEach((img) => currentImages.push(img.src.includes("/images/") && img.src));

    if (imageArray.length > currentImages.length) {
      for (const img of imageArray) {
        if (!currentImages.includes(img)) {
          try {
            // 서버에서 이미지 삭제하기
            await API.deleteImage({ imagePath: img });

            // imageArray에서 삭제하기
            removeImage(img);
          } catch (e) {
            console.log(e.message);
          }
        }
      }
    }
  };

  return (
    <div css={EditorContainer}>
      <Button
        onClick={() => {
          saveContents();
          saveTitle(title);
        }}>
        저장하기
      </Button>
      <Editor handleInitialize={handleInitialize} imageArray={imageArray} data={data} />
    </div>
  );
};

export default AddEditor;
