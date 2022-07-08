/** @jsxImportSource @emotion/react */
import { css, Global } from "@emotion/react";
import React, { useState, useCallback, useRef } from "react";
import Head from "next/head";
import AppLayout from "../components/AppLayout";
import dynamic from "next/dynamic";
import { Steps, Button, message, Result } from "antd";
import CreatePortfolioCard from "../components/Portfolo/CreatePortfolioCard";
const { Step } = Steps;

let Editor = dynamic(() => import("../components/PortfolioEdit/Editor"), {
  ssr: false,
});

const createPortfolio = () => {
  const [current, setCurrent] = useState(0);
  const next = () => {
    setCurrent(current + 1);
  };

  const prev = () => {
    setCurrent(current - 1);
  };
  const onChange = (value) => {
    console.log("onChange:", current);
    setCurrent(value);
  };

  const editorCore = React.useRef(null);
  const [imageArray, setImageArray] = useState([]); /* to keep track of uploaded image */
  const handleInitialize = useCallback((instance) => {
    editorCore.current = instance;
  }, []);

  function removeImage(img) {
    const array = imageArray.filter((image) => image !== img);
    setImageArray(array);
  }

  const savePortfolio = async (e) => {
    e.preventDefault();

    /* get the editor.js content and save it to server */
    try {
      const savedData = await editorCore.current.save();
      console.log(savedData);
      const data = {
        description: JSON.stringify(savedData),
      };
      console.log(data);

      /* Clear all the unused images from server */
      await clearEditorLeftoverImages();

      /* Save portfolio to server */
      //createPortfolio(data);
    } catch (err) {
      console.log(err);
    }
  };

  /* This method will get the current images that are used by editor js,
     and images that stored in imageArray. It will compare and call server request to
     remove unused image */
  const clearEditorLeftoverImages = async () => {
    /* Get editorJs images */
    const currentImages = [];
    document
      .querySelectorAll(".image-tool__image-picture")
      .forEach((x) => currentImages.push(x.src.includes("/images/") && x.src));

    if (imageArray.length > currentImages.length) {
      /* image deleted */
      for (const img of imageArray) {
        if (!currentImages.includes(img)) {
          try {
            /* delete image from backend */
            await API.deleteImage({ imagePath: img });

            /* remove from array */
            removeImage(img);
          } catch (err) {
            console.log(err.message);
          }
        }
      }
    }
  };
  const StepsPadding = css`
    padding: 40px 20px;
    .ant-steps-item-process > .ant-steps-item-container > .ant-steps-item-icon {
      background: #000;
    }
    .ant-steps-item-process .ant-steps-item-icon {
      background-color: #fff;
      border-color: #000;
    }
    .ant-steps-item-finish .ant-steps-item-icon {
      background-color: #fff;
      border-color: #000;
    }
    .ant-steps-item-finish .ant-steps-item-icon > .ant-steps-icon {
      color: #000;
    }
    .ant-steps-item-finish
      > .ant-steps-item-container
      > .ant-steps-item-content
      > .ant-steps-item-title::after {
      background-color: #000;
    }
  `;
  const ButtonCss = css`
    background: #1890ff;
    border-color: #1890ff;
    :hover {
      background: #69c0ff;
      border-color: #69c0ff;
    }
  `;

  return (
    <AppLayout>
      <Global
        styles={css`
          .ant-btn-primary {
            background: #000;
            border-color: #000;
          }
          .ant-btn-primary: hover {
            background: #bbb;
            border-color: #bbb;
          }
          .ant-btn-primary: focus {
            background: #000;
            border-color: #000;
          }
          .ant-btn-default: hover {
            border-color: #000;
            color: #000;
          }
          .ant-btn-default: focus {
            border-color: #000;
            color: #000;
          }
        `}
      />
      <Head>
        <title>포트폴리오 작성</title>
      </Head>
      <Steps css={StepsPadding} current={current}>
        <Step title="Step 1" description="This is a description." />
        <Step title="Step 2" description="This is a description." />
        <Step title="Step 3" description="This is a description." />
      </Steps>
      <div
        className="steps-action"
        style={{
          width: "100%",
          display: "flex",
          justifyContent: "end",
          paddingRight: 10,
          paddingBottom: 20,
        }}>
        {current > 0 && (
          <Button
            style={{
              margin: "0 8px",
            }}
            onClick={() => prev()}>
            Previous
          </Button>
        )}
        {current < 1 && (
          <Button type="primary" onClick={() => next()}>
            Next
          </Button>
        )}
        {current === 1 && (
          <Button
            css={ButtonCss}
            type="primary"
            onClick={() => message.success("Processing complete!")}>
            Done
          </Button>
        )}
      </div>
      <Result
        status="success"
        title="Successfully Purchased Cloud Server ECS!"
        subTitle="Order number: 2017182818828182881 Cloud server configuration takes 1-5 minutes, please wait."
        extra={[
          <Button type="primary" key="console">
            Go Console
          </Button>,
          <Button key="buy">Buy Again</Button>,
        ]}
      />
      <CreatePortfolioCard />
      <h1>포트폴리오 작성</h1>
      <button onClick={savePortfolio}>Save</button>
      <Editor handleInitialize={handleInitialize} imageArray={imageArray} />
    </AppLayout>
  );
};

export default createPortfolio;
