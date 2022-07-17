/** @jsxImportSource @emotion/react */
import { css, jsx } from "@emotion/react";
import Link from "next/link";
import { Dropdown, Menu, Space } from "antd";
import { PlusCircleOutlined } from "@ant-design/icons";

const addButtonStyle = css`
  & div {
    background-color: rgb(220, 220, 220);
    transition: 400ms;
    color: black;
    border-radius: 10px;
    width: 60px;
    height: 40px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  & div:hover {
    background-color: black;
    color: white;
  }
  @media (max-width: 768px) {
    & div {
      width: 40px;
    }
  }
`;

const AddButton = () => {
  const menu = (
    <Menu
      items={[
        {
          label: (
            <Link href="/createPortfolio">
              <a> 내 포트폴리오 추가하기</a>
            </Link>
          ),
          key: "1",
        },
        {
          label: (
            <Link href="/qna/new">
              <a>질문 올리기</a>
            </Link>
          ),
          key: "2",
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
