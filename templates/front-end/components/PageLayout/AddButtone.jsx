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
    width: 100px;
    height: 40px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  & div:hover {
    background-color: black;
  }
  @media (max-width: 768px) {
    & div {
      width: 80px;
    }
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
          <Space>
            <PlusCircleOutlined style={{ fontSize: "25px" }} />
          </Space>
        </a>
      </Dropdown>
    </div>
  );
};

export default AddButton;
