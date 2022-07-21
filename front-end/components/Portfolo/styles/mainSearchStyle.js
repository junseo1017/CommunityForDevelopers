import { css, jsx } from "@emotion/react";
import styled from "@emotion/styled";

export const SearchCss = css`
  width: 100%;
  background-color: #f9f9f9;
  border: 1px solid #ccc;
  border-radius: 999px;
  display: -webkit-box;
  display: flex;
  -webkit-box-pack: center;
  justify-content: center;
  left: 0;
  position: relative;
  right: 0;
  z-index: 3;
  & > div:first-of-type {
    -webkit-box-flex: 4;
    position: relative;
    width: 100%;
    flex-grow: 4;
    & > div:first-of-type {
      border: 1px solid transparent;
      height: 50px;
      border-radius: 50px;
      display: flex;
      margin-top: 2px;
      width: 100%;
      & > div {
        width: 50px;
        -webkit-box-align: center;
        align-items: center;
        display: flex;
        -webkit-box-pack: center;
        justify-content: center;
        z-index: 1;
        & > svg {
          fill: dimgray;
          height: 23px;
          width: 23px;
          margin-left: 4px;
          margin-top: -1px;
          & > path {
            fill: dimgray;
          }
        }
      }
      & > form {
        margin-right: 0;
        position: relative;
        z-index: 1;
        -webkit-box-flex: 1;
        flex: 1;

        & > label {
          & > input {
            outline: none;
            outline-offset: 2px;
            font-size: 22px;
            font-weight: 800;
            appearance: none;
            background: transparent;
            border: none;
            color: #191919;
            height: 100%;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
            width: 100%;
          }
        }
      }
    }
  }
  & > div:last-of-type {
    background-color: #fff;
    border-bottom-right-radius: 999px;
    border-left: 1px solid #ccc;
    border-top-right-radius: 999px;
    float: right;
    & > ul {
      margin: 0;
      list-style: none;
      -webkit-box-align: center;
      align-items: center;
      display: flex;
      justify-content: space-evenly;
      padding: 10px 17px;
      & > li {
        padding-right: 8px;
      }
    }
  }
`;
export const Button = styled.button`
  -webkit-box-align: center;
  align-items: center;
  background-color: #fff;
  border-radius: 999px;
  color: #191919;
  border: none;
  cursor: pointer;
  display: flex;
  font-size: 16px;
  font-weight: 600;
  -webkit-box-pack: center;
  justify-content: center;
  padding: 6px 13px 6px 12px;
  text-align: center;
  white-space: nowrap;
  ${(props) =>
    props.checked &&
    css`
      background-color: #333;
      color: #fff;
      text-decoration: none;
      font-weight: 300;
    `}
`;
