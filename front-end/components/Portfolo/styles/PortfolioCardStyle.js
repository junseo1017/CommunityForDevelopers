/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import styled from "@emotion/styled";

export const CardCss = css`
  .ant-card-actions {
    border: none;
  }
  .ant-card-body {
    padding: 22px;
  }
`;

export const ScrollDiv = styled.div`
  overflow-x: auto;
  white-space: nowrap;

  &::-webkit-scrollbar {
    width: 4px;
    height: 5px;
  }
  &::-webkit-scrollbar-thumb {
    border-radius: 2px;
    background: #ddd;
  }
`;

export const skillsCss = css`
  padding-top: 20px;
  display: flex;
  align-content: center;
  justify-content: flex-start;
  margin-bottom: 5px;
`;

export const IconCss = css`
  .ant-space + .ant-space {
    padding-left: 13px;
  }
  .ant-space {
    gap: 5px !important;
  }
  display: flex;
  justify-content: flex-end;
`;

export const authorCss = css`
  paddingleft: 3px;
  width: 100%;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
`;

export const rowCss = css`
  padding-top: 5px;
`;

export const colCss = css`
  display: flex;
  align-items: flex-end;
`;
