/** @jsxImportSource @emotion/react */
import { css, jsx } from "@emotion/react";
import Link from "next/link";
import { Dropdown, Menu, Space } from "antd";
import { PlusCircleOutlined } from "@ant-design/icons";

const addButtonStyle = css`
  & div {
    width: 80px;
    height: 35px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  & div > div {
    transition: 400ms;
    width: 100%;
    border-radius: 100px;
    border: 1px solid #e8e8e8 !important;
    color: rgb(50, 50, 50);
  }
  & div > div:hover {
    background-color: #e8e8e8;
  }
  @media (max-width: 768px) {
    & div {
      font-size: 16px;
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
        <a>
          <Space>
            <div>등록하기</div>
          </Space>
        </a>
      </Dropdown>
    </div>
  );
};

export default AddButton;
