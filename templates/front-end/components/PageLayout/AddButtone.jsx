/** @jsxImportSource @emotion/react */
import { css, jsx } from "@emotion/react";
import { Dropdown, Menu, Space } from "antd";
import { PlusCircleOutlined } from "@ant-design/icons";

const addButtonStyle = css`
  & div {
    background-color: #aca3a37b;
    transition: 0.4s;
    color: white;
    border-radius: 10px;
    width: 7vw;
    height: 40px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  & div:hover {
    background-color: black;
  }
`;

const AddButton = () => {
  const menu = (
    <Menu
      items={[
        {
          label: <a href="/"> 내 포트폴리오 추가하기</a>,
          key: "1",
        },
        {
          label: <a href="/">질문 올리기</a>,
          key: "1",
        },
      ]}
    />
  );
  return (
    <div css={addButtonStyle}>
      <Dropdown overlay={menu}>
        <a href="#">
          <Space>작업 공유</Space>
        </a>
      </Dropdown>
    </div>
  );
};

export default AddButton;
