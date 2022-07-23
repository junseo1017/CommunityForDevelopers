/** @jsxImportSource @emotion/react */
import { css, jsx } from "@emotion/react";
import AddButton from "./AddButton";
import MenuButton from "./MenuButton";
import { HeaderContainer, HeaderContent } from "./styles/HeaderStyles";
import Logo from "./Logo";
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
