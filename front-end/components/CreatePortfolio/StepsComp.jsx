/** @jsxImportSource @emotion/react */
import { css, jsx } from "@emotion/react";
import React, { useState } from "react";
import { Steps, Button } from "antd";
import { StepsPadding, ButtonCss } from "./styles/StepsComponentStyle";
import { blackBtn } from "../Common/style/btnStyle";
const { Step } = Steps;

const StepsComp = ({ current = 0, showModal, prev, savePortf }) => {
  return (
    <>
      <Steps css={StepsPadding} current={current}>
        <Step title="Step 1" description="썸네일 카드 작성" />
        <Step title="Step 2" description="포트폴리오 내용 작성" />
        <Step title="Step 3" description="완료" />
      </Steps>
      <div
        className="steps-action"
        style={{
          width: "100%",

          paddingTop: "20px",
        }}>
        <div style={{ paddingTop: "20px", display: "flex", justifyContent: "end" }}>
          <div css={blackBtn}>
            {current > 0 && current < 2 && (
              <Button
                style={{
                  margin: "0 8px",
                }}
                onClick={() => {
                  savePortf();
                  prev();
                }}>
                뒤로
              </Button>
            )}
          </div>
          {current === 1 && (
            <Button
              css={ButtonCss}
              type="primary"
              onClick={(e) => {
                showModal();
              }}>
              완료
            </Button>
          )}
        </div>
      </div>
    </>
  );
};

export default StepsComp;
