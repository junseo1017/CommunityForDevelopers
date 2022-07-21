/** @jsxImportSource @emotion/react */
import { css, jsx } from "@emotion/react";
import { useState } from "react";
import { Drawer } from "antd";
import { MenuOutlined } from "@ant-design/icons";
import LoggedinMenu from "./LoggedinMenu";

import Link from "next/link";
const MenuButtonStyle = css`
  & div {
    color: black;
    width: 40px;
    height: 40px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 26px;
  }
`;

const MenuContanier = css`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  gap: 5vw;
  & a {
    color: black;
    font-size: 22px;
    font-weight: 700;
  }
`;

const DrawerStyle = css`
  & .ant-drawer-content-wrapper {
    width: 200px !important;
  }
`;

const MenuButton = () => {
  const [visible, setVisible] = useState(false);

  const showDrawer = () => {
    setVisible(true);
  };

  const onClose = () => {
    setVisible(false);
  };

  return (
    <>
      <div onClick={showDrawer} css={MenuButtonStyle}>
        <div>
          <MenuOutlined />
        </div>
      </div>
      <Drawer
        aria-label="메뉴 열기"
        css={DrawerStyle}
        placement="right"
        onClose={onClose}
        visible={visible}>
        <nav css={MenuContanier}>
          <Link href="/">
            <a>포트폴리오</a>
          </Link>
          <Link href="/qna">
            <a>Q&A</a>
          </Link>
          <LoggedinMenu />
        </nav>
      </Drawer>
    </>
  );
};

export default MenuButton;
