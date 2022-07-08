/** @jsxImportSource @emotion/react */
import { css, jsx } from "@emotion/react";
import AddButton from "./AddButtone";
import MenuButton from "./MenuButton";
import { HeaderContainer, HeaderContent, HeaderLogo } from "./styles/HeaderStyles";
import { MenuOutlined } from "@ant-design/icons";
import Logo from "./logo";
import Link from "next/link";
const Header = () => {
  return (
    <header css={HeaderContainer}>
      <div>
        <div css={HeaderContent}>
          <nav>
            <Link href="/">
              <a>
                <Logo />
              </a>
            </Link>
          </nav>
          <nav>
            <AddButton />
            <MenuButton />
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;
