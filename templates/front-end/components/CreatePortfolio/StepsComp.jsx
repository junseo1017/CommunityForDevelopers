/** @jsxImportSource @emotion/react */
import { css, jsx } from "@emotion/react";
import React, { useState } from "react";
import { Steps, Button, message } from "antd";
import { StepsPadding, ButtonCss } from "./styles/StepsComponentStyle";
import { blackBtn } from "../Common/style/btnStyle";
const { Step } = Steps;

const StepsComp = ({ setCurrent, current = 0, save }) => {
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

  return (
    <>
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
        <div css={blackBtn}>
          {current > 0 && current < 2 && (
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
        </div>
        {current === 1 && (
          <Button
            css={ButtonCss}
            type="primary"
            onClick={(e) => {
              next();
              save(e);
              message.success("Processing complete!");
            }}>
            Done
          </Button>
        )}
      </div>
    </>
  );
};

export default StepsComp;